import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Entry } from "@/components/journal/types";
import { useToast } from "@/hooks/use-toast";

export function useJournalEntries(date?: Date) {
  const { toast } = useToast();

  const fetchEntries = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) {
      // Return sample data for unauthenticated users
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(now);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const fourDaysAgo = new Date(now);
      fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

      return [
        {
          id: 1,
          created_at: now.toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 75,
            temptation_type: 'pride',
            intensity_level: 30,
            mood_description: 'Feeling strong and focused today'
          }],
          temptation_entries: []
        },
        {
          id: 2,
          created_at: now.toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'lust',
            intensity_level: 85,
            resisted: true,
            temptation_details: 'Had strong urges but managed to resist through prayer',
            resistance_strategy: 'Prayed and went for a walk'
          }],
          checkin_entries: []
        },
        {
          id: 3,
          created_at: yesterday.toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'lust',
            intensity_level: 85,
            resisted: false,
            temptation_details: 'Struggled with impure thoughts',
            resistance_strategy: 'Tried to pray but gave in'
          }],
          checkin_entries: []
        },
        {
          id: 4,
          created_at: yesterday.toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 40,
            temptation_type: 'lust',
            intensity_level: 60,
            mood_description: 'Feeling weak after yesterday\'s struggle'
          }],
          temptation_entries: []
        },
        {
          id: 5,
          created_at: twoDaysAgo.toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 65,
            temptation_type: 'pride',
            intensity_level: 45,
            mood_description: 'Doing better today, staying humble'
          }],
          temptation_entries: []
        },
        {
          id: 6,
          created_at: threeDaysAgo.toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 80,
            temptation_type: 'sloth',
            intensity_level: 20,
            mood_description: 'Feeling motivated and productive'
          }],
          temptation_entries: []
        },
        {
          id: 7,
          created_at: threeDaysAgo.toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'wrath',
            intensity_level: 70,
            resisted: true,
            temptation_details: 'Got very angry at work but managed to stay calm',
            resistance_strategy: 'Took deep breaths and stepped away'
          }],
          checkin_entries: []
        },
        {
          id: 8,
          created_at: fourDaysAgo.toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 55,
            temptation_type: 'greed',
            intensity_level: 40,
            mood_description: 'Struggling with contentment today'
          }],
          temptation_entries: []
        }
      ] as Entry[];
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
    const transformedData = data.map(entry => ({
      ...entry,
      // Ensure temptation_entries is always an array
      temptation_entries: Array.isArray(entry.temptation_entries) 
        ? entry.temptation_entries 
        : entry.temptation_entries 
          ? [entry.temptation_entries] 
          : [],
      // Ensure checkin_entries is always an array
      checkin_entries: Array.isArray(entry.checkin_entries)
        ? entry.checkin_entries
        : entry.checkin_entries
          ? [entry.checkin_entries]
          : []
    })) as Entry[];

    return transformedData;
  };

  return useQuery({
    queryKey: ['journal-entries', date?.toISOString()],
    queryFn: fetchEntries,
  });
}