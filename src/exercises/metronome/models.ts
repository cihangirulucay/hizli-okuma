export const MIN_PRESENTATION_WPM = 60;
export const MAX_PRESENTATION_WPM = 120;
export const DEFAULT_PRESENTATION_WPM = 70;
export const PRESENTATION_WPM_STEP = 5;

export type MetronomePlaybackState = 'idle' | 'running' | 'paused' | 'completed';

export type ActiveWordInput = {
  elapsedMs: number;
  presentationWpm: number;
  wordCount: number;
};
