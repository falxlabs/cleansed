import { supabase } from "@/integrations/supabase/client";

export async function getRecentJournalEntries(limit: number = 5) {
  const { data, error } = await supabase
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
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }

  return data;
}