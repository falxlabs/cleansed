export interface Profile {
  id: string;
  first_name: string | null;
  age: number | null;
  created_at: string | null;
  updated_at: string | null;
  last_seen_at: string | null;
}

export type EntryType = 'check-in' | 'temptation';
export type TemptationType = 'pride' | 'greed' | 'lust' | 'envy' | 'gluttony' | 'wrath' | 'sloth';

export interface JournalEntry {
  id: number;
  user_id: string;
  entry_type: EntryType;
  created_at: string | null;
  updated_at: string | null;
}

export interface TemptationEntry extends JournalEntry {
  temptation_type: TemptationType;
  intensity_level: number;
  trigger: string | null;
  resisted: boolean;
  resistance_strategy: string | null;
  temptation_details: string | null;
  encrypted_details: string | null;
}

export interface CheckInEntry extends JournalEntry {
  mood_score: number | null;
  mood_description: string | null;
  temptation_type: TemptationType | null;
  intensity_level: number | null;
  affirmation_content: string | null;
}

export interface Affirmation {
  id: number;
  content: string;
  created_at: string | null;
}

export interface UserAffirmation {
  id: number;
  user_id: string;
  content: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface NotificationSettings {
  user_id: string;
  email_enabled: boolean;
  push_enabled: boolean;
  check_in_time: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TemptationSettings {
  user_id: string;
  default_type: TemptationType | null;
  default_intensity: number | null;
  created_at: string | null;
  updated_at: string | null;
}