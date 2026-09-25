import {
  MAX_PRESENTATION_WPM,
  MIN_PRESENTATION_WPM,
  type ActiveWordInput,
} from './models';

export function tokenizeWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function normalizePresentationWpm(presentationWpm: number): number {
  if (!Number.isFinite(presentationWpm)) {
    return MIN_PRESENTATION_WPM;
  }

  return Math.min(
    MAX_PRESENTATION_WPM,
    Math.max(MIN_PRESENTATION_WPM, Math.round(presentationWpm)),
  );
}

export function getWordIntervalMs(presentationWpm: number): number {
  const normalizedWpm = normalizePresentationWpm(presentationWpm);

  return Math.round(60_000 / normalizedWpm);
}

export function getTotalPresentationDurationMs(
  wordCount: number,
  presentationWpm: number,
): number {
  if (wordCount <= 0) {
    return 0;
  }

  return wordCount * getWordIntervalMs(presentationWpm);
}

export function getActiveWordIndex({
  elapsedMs,
  presentationWpm,
  wordCount,
}: ActiveWordInput): number {
  if (wordCount <= 0) {
    return -1;
  }

  if (elapsedMs <= 0) {
    return 0;
  }

  const intervalMs = getWordIntervalMs(presentationWpm);
  const index = Math.floor(elapsedMs / intervalMs);

  return Math.min(index, wordCount - 1);
}

export function getPresentationProgress(input: ActiveWordInput): number {
  if (input.wordCount <= 0) {
    return 0;
  }

  const totalDurationMs = getTotalPresentationDurationMs(
    input.wordCount,
    input.presentationWpm,
  );

  return Math.min(1, Math.max(0, input.elapsedMs / totalDurationMs));
}

export function isMetronomeComplete(input: ActiveWordInput): boolean {
  if (input.wordCount <= 0) {
    return true;
  }

  return (
    input.elapsedMs >=
    getTotalPresentationDurationMs(input.wordCount, input.presentationWpm)
  );
}
