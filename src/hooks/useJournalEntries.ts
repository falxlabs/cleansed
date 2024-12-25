import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { JournalEntry } from "@/types/journal";
import { useToast } from "@/hooks/use-toast";

export function useJournalEntries(date?: Date) {
  const { toast } = useToast();

  const fetchEntries = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) {
      return [];
    }

    const query = supabase
      .from('journal_entries')
      .select(`
        id,
        entry_type,
        created_at,
        temptation_entries (
          temptation_type,
          intensity_level,
          resisted,
          trigger,
          resistance_strategy,
          temptation_details
        ),
        checkin_entries (
          mood_score,
          temptation_type,
          intensity_level,
          mood_description
        )
      `)
      .eq('user_id', sessionData.session.user.id)
      .order('created_at', { ascending: false });

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.gte('created_at', startOfDay.toISOString())
           .lte('created_at', endOfDay.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching entries:', error);
      toast({
        title: "Error loading entries",
        description: "Please try again later",
        variant: "destructive",
      });
      return [];
    }

    if (!data) return [];

    // Transform the data to match our expected structure
    const transformedData = data.map(entry => {
      // Ensure temptation_entries and checkin_entries are always arrays
      const transformedEntry = {
        ...entry,
        temptation_entries: Array.isArray(entry.temptation_entries) 
          ? entry.temptation_entries 
          : entry.temptation_entries 
            ? [entry.temptation_entries] 
            : [],
        checkin_entries: Array.isArray(entry.checkin_entries)
          ? entry.checkin_entries
          : entry.checkin_entries
            ? [entry.checkin_entries]
            : []
      };

      return transformedEntry;
    });

    return transformedData as unknown as JournalEntry[];
  };

  return useQuery({
    queryKey: ['journal-entries', date?.toISOString()],
    queryFn: fetchEntries,
  });
}