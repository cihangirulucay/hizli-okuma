export type ReadingDifficulty = 1 | 2 | 3;

export type ReadingText = {
  id: string;
  title: string;
  grade: number;
  difficulty: ReadingDifficulty;
  text: string;
  wordCount: number;
  estimatedDurationSeconds: number;
  tags: string[];
};
