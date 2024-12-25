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
  trigger?: string;
  resistance_strategy?: string;
  temptation_details?: string;
}

export interface CheckInEntryData {
  mood_score?: number;
  temptation_type?: TemptationType;
  intensity_level?: number;
  mood_description?: string;
}

export interface JournalEntry extends BaseEntry {
  temptation_entries: TemptationEntryData[];
  checkin_entries: CheckInEntryData[];
}