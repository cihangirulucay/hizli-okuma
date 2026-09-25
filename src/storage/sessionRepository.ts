import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Session } from '../sessions/models';

const SESSION_STORAGE_KEY = '@hizli-okuma/sessions-v1';

export interface SessionRepository {
  save(session: Session): Promise<void>;
  getAll(): Promise<Session[]>;
}

function isSessionArray(value: unknown): value is Session[] {
  return Array.isArray(value);
}

export const asyncStorageSessionRepository: SessionRepository = {
  async save(session) {
    const sessions = await this.getAll();
    await AsyncStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify([...sessions, session]),
    );
  },

  async getAll() {
    const rawValue = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!isSessionArray(parsedValue)) {
      return [];
    }

    return parsedValue;
  },
};
