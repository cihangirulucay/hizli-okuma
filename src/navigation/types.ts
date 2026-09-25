import type { Session } from '../sessions/models';

export type AppRoute =
  | { name: 'Home' }
  | { name: 'MetronomeReading' }
  | { name: 'Result'; session: Session };
