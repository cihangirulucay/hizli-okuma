import {
  createMetronomeExerciseResult,
  createSession,
} from './sessionService';

describe('session service', () => {
  it('creates a metronome exercise result without treating tempo as measured speed', () => {
    const result = createMetronomeExerciseResult({
      contentId: 'text-1',
      startedAt: '2026-09-25T10:00:00.000Z',
      completedAt: '2026-09-25T10:01:10.000Z',
      completed: true,
      difficulty: 1,
      wordCount: 42,
      presentationWpm: 70,
    });

    expect(result.durationMs).toBe(70_000);
    expect(result.presentationWpm).toBe(70);
    expect(result).not.toHaveProperty('measuredReadingWpm');
  });

  it('creates a session around exercise results', () => {
    const result = createMetronomeExerciseResult({
      contentId: 'text-1',
      startedAt: '2026-09-25T10:00:00.000Z',
      completedAt: '2026-09-25T10:00:30.000Z',
      completed: true,
      difficulty: 1,
      wordCount: 20,
      presentationWpm: 80,
    });

    expect(
      createSession({
        id: 'session-1',
        startedAt: result.startedAt,
        completedAt: result.completedAt,
        completionState: 'completed',
        exerciseResults: [result],
      }),
    ).toEqual({
      id: 'session-1',
      startedAt: result.startedAt,
      completedAt: result.completedAt,
      completionState: 'completed',
      exerciseResults: [result],
    });
  });
});
