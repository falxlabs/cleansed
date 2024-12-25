import { TemptationType } from "./database";

export interface BaseEntry {
  id: number;
  created_at: string;
  entry_type: 'check-in' | 'temptation';
}

export interface TemptationEntryData {
  temptation_type: TemptationType;
  intensity_level: number;
  resisted: boolean;
  trigger?: string | null;
  resistance_strategy?: string | null;
  temptation_details?: string | null;
}

export interface CheckInEntryData {
  mood_score?: number | null;
  temptation_type?: TemptationType | null;
  intensity_level?: number | null;
  mood_description?: string | null;
}

export interface JournalEntry extends BaseEntry {
  temptation_entries: TemptationEntryData[];
  checkin_entries: CheckInEntryData[];
}

// Type guard to ensure data matches our expected structure
export function isValidJournalEntry(entry: any): entry is JournalEntry {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    typeof entry.id === 'number' &&
    typeof entry.created_at === 'string' &&
    (entry.entry_type === 'check-in' || entry.entry_type === 'temptation') &&
    Array.isArray(entry.temptation_entries) &&
    Array.isArray(entry.checkin_entries)
  );
}