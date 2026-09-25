export type ExerciseType = 'metronome-reading';

export type SessionCompletionState = 'completed' | 'abandoned';

export type ExerciseResult = {
  exerciseType: ExerciseType;
  contentId: string;
  startedAt: string;
  completedAt: string;
  durationMs: number;
  completed: boolean;
  difficulty: 1 | 2 | 3;
  wordCount: number;
  /**
   * Presentation tempo for the exercise UI. This is not a measured reading speed.
   */
  presentationWpm: number;
};

export type Session = {
  id: string;
  startedAt: string;
  completedAt: string;
  completionState: SessionCompletionState;
  exerciseResults: ExerciseResult[];
};
