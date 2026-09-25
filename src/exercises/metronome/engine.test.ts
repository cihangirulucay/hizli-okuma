import {
  getActiveWordIndex,
  getWordIntervalMs,
  isMetronomeComplete,
  tokenizeWords,
} from './engine';

describe('metronome engine', () => {
  it('calculates word interval from presentation WPM', () => {
    expect(getWordIntervalMs(60)).toBe(1000);
    expect(getWordIntervalMs(120)).toBe(500);
  });

  it('tokenizes text into words', () => {
    expect(tokenizeWords('Kerem   kitap okudu.')).toEqual([
      'Kerem',
      'kitap',
      'okudu.',
    ]);
  });

  it('returns the active word index for elapsed time', () => {
    expect(
      getActiveWordIndex({
        elapsedMs: 0,
        presentationWpm: 60,
        wordCount: 4,
      }),
    ).toBe(0);
    expect(
      getActiveWordIndex({
        elapsedMs: 1_999,
        presentationWpm: 60,
        wordCount: 4,
      }),
    ).toBe(1);
  });

  it('caps the active word index at the final word', () => {
    expect(
      getActiveWordIndex({
        elapsedMs: 20_000,
        presentationWpm: 120,
        wordCount: 3,
      }),
    ).toBe(2);
  });

  it('detects completion after all words have been presented', () => {
    expect(
      isMetronomeComplete({
        elapsedMs: 2_999,
        presentationWpm: 60,
        wordCount: 3,
      }),
    ).toBe(false);
    expect(
      isMetronomeComplete({
        elapsedMs: 3_000,
        presentationWpm: 60,
        wordCount: 3,
      }),
    ).toBe(true);
  });
});
