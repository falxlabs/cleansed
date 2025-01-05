import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Entry, TemptationEntry, CheckInEntry } from "@/components/journal/types";

export const JOURNAL_QUERY_KEYS = {
  entries: 'journal-entries',
  entriesByDate: (date?: Date) => ['journal-entries', date?.toISOString()],
};

interface DatabaseEntry {
  id: number;
  user_id: string;
  entry_type: 'check-in' | 'temptation';
  created_at: string;
  updated_at: string;
  temptation_entries: DatabaseTemptationEntry | null;
  checkin_entries: DatabaseCheckInEntry | null;
}

interface DatabaseTemptationEntry {
  id: number;
  temptation_type: string;
  intensity_level: number;
  trigger: string | null;
  resisted: boolean;
  resistance_strategy: string | null;
  temptation_details: string | null;
  occurred_at: string | null;
}

interface DatabaseCheckInEntry {
  id: number;
  mood_score: number | null;
  mood_description: string | null;
  temptation_type: string | null;
  intensity_level: number | null;
  affirmation_content: string | null;
}

const transformDatabaseEntry = (entry: DatabaseEntry): Entry => ({
  id: entry.id,
  created_at: entry.created_at,
  entry_type: entry.entry_type,
  temptation_entries: entry.temptation_entries 
    ? [transformTemptationEntry(entry.temptation_entries)]
    : [],
  checkin_entries: entry.checkin_entries 
    ? [transformCheckInEntry(entry.checkin_entries)]
    : [],
});

const transformTemptationEntry = (entry: DatabaseTemptationEntry): TemptationEntry => ({
  temptation_type: entry.temptation_type,
  intensity_level: entry.intensity_level,
  resisted: entry.resisted,
  temptation_details: entry.temptation_details || undefined,
  trigger: entry.trigger || undefined,
  resistance_strategy: entry.resistance_strategy || undefined,
  occurred_at: entry.occurred_at || undefined,
});

const transformCheckInEntry = (entry: DatabaseCheckInEntry): CheckInEntry => ({
  mood_score: entry.mood_score,
  temptation_type: entry.temptation_type,
  intensity_level: entry.intensity_level,
  mood_description: entry.mood_description || undefined,
});

const fetchEntries = async (date?: Date) => {
  const query = supabase
    .from('journal_entries')
    .select(`
      *,
      temptation_entries(*),
      checkin_entries(*)
    `)
    .order('created_at', { ascending: false });

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    query
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }

  return (data as DatabaseEntry[]).map(transformDatabaseEntry);
};

export function useJournalEntries(date?: Date) {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.entriesByDate(date),
    queryFn: () => fetchEntries(date),
    enabled: true,
  });
}