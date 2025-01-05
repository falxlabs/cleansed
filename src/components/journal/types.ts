export interface Entry {
  id: number;
  created_at: string;
  entry_type: 'check-in' | 'temptation';
  temptation_entries: TemptationEntry[];
  checkin_entries: CheckInEntry[];
}

export interface TemptationEntry {
  temptation_type: string;
  intensity_level: number;
  resisted: boolean;
  temptation_details?: string;
  trigger?: string;
  resistance_strategy?: string;
  occurred_at?: string;
}

export interface CheckInEntry {
  mood_score: number | null;
  temptation_type: string | null;
  intensity_level: number | null;
  mood_description?: string;
}

export interface EntryRowProps {
  entry: Entry;
  onClick: (entry: Entry) => void;
}