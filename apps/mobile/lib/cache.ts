import { SEED_PROBLEMS, SEED_FLASHCARDS } from '@devprep/db';

/**
 * Mobile Offline Cache Store
 * Mirrors local MMKV / SQLite behavior for zero-latency offline commute study
 */
class OfflineStorage {
  private cache = new Map<string, any>();

  constructor() {
    this.cache.set('offline_problems', SEED_PROBLEMS);
    this.cache.set('offline_flashcards', SEED_FLASHCARDS);
  }

  getItem<T>(key: string): T | null {
    return this.cache.get(key) || null;
  }

  setItem<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }
}

export const offlineStorage = new OfflineStorage();
