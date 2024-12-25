// This file is now only used for types since we're moving to database storage
export interface JournalEntry {
  id: number;
  date: Date;
  type: string;
  resisted: boolean;
  level: string;
  trigger: string;
  notes: string;
  mood?: number;
  affirmation?: string;
  description?: string;
}

// Keeping these for backwards compatibility during migration
export const saveJournalEntry = (entry: Omit<JournalEntry, "id">) => {
  console.warn('saveJournalEntry is deprecated. Use database storage instead.');
  return { ...entry, id: Date.now() };
};

export const loadJournalEntries = (): JournalEntry[] => {
  console.warn('loadJournalEntries is deprecated. Use database storage instead.');
  return [];
};

export const calculateStreak = async (): Promise<number> => {
  console.warn('calculateStreak from localStorage is deprecated. Use useUserProgress hook instead.');
  return 0;
};
