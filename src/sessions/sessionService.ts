import {
  type ExerciseResult,
  type Session,
  type SessionCompletionState,
} from './models';
import type { SessionRepository } from '../storage/sessionRepository';

export type CreateMetronomeResultInput = {
  contentId: string;
  startedAt: string;
  completedAt: string;
  completed: boolean;
  difficulty: 1 | 2 | 3;
  wordCount: number;
  presentationWpm: number;
};

export function createMetronomeExerciseResult({
  contentId,
  startedAt,
  completedAt,
  completed,
  difficulty,
  wordCount,
  presentationWpm,
}: CreateMetronomeResultInput): ExerciseResult {
  return {
    exerciseType: 'metronome-reading',
    contentId,
    startedAt,
    completedAt,
    durationMs: Math.max(0, Date.parse(completedAt) - Date.parse(startedAt)),
    completed,
    difficulty,
    wordCount,
    presentationWpm,
  };
}

export function createSession({
  id,
  startedAt,
  completedAt,
  completionState,
  exerciseResults,
}: {
  id: string;
  startedAt: string;
  completedAt: string;
  completionState: SessionCompletionState;
  exerciseResults: ExerciseResult[];
}): Session {
  return {
    id,
    startedAt,
    completedAt,
    completionState,
    exerciseResults,
  };
}

export function createSessionId(now: Date = new Date()): string {
  return `session-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function completeMetronomeSession(
  input: CreateMetronomeResultInput,
  repository?: SessionRepository,
): Promise<Session> {
  const result = createMetronomeExerciseResult(input);
  const session = createSession({
    id: createSessionId(new Date(input.completedAt)),
    startedAt: result.startedAt,
    completedAt: result.completedAt,
    completionState: result.completed ? 'completed' : 'abandoned',
    exerciseResults: [result],
  });

  const targetRepository = repository ?? (await getDefaultSessionRepository());
  await targetRepository.save(session);

  return session;
}

export async function getCompletedSessions(
  repository?: SessionRepository,
): Promise<Session[]> {
  const targetRepository = repository ?? (await getDefaultSessionRepository());

  return targetRepository.getAll();
}

async function getDefaultSessionRepository(): Promise<SessionRepository> {
  const { asyncStorageSessionRepository } = await import(
    '../storage/sessionRepository'
  );

  return asyncStorageSessionRepository;
}
