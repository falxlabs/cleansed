import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Entry } from "@/components/journal/types";

export const JOURNAL_QUERY_KEYS = {
  entries: 'journal-entries',
  entriesByDate: (date?: Date) => ['journal-entries', date?.toISOString()],
};

const fetchEntries = async (date?: Date) => {
  const query = supabase
    .from('journal_entries')
    .select(`
      *,
      temptation_entries(*),
      checkin_entries(
        *,
        affirmation:affirmations(*),
        custom_affirmation:user_affirmations(*)
      )
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

  return data as Entry[];
};

export function useJournalEntries(date?: Date) {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.entriesByDate(date),
    queryFn: () => fetchEntries(date),
    enabled: true, // Only fetch when component mounts
  });
}