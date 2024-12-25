import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SAMPLE_VERSE = {
  id: 1,
  reference: "1 Corinthians 10:13",
  content_csb: "No temptation has come upon you except what is common to humanity. But God is faithful; he will not allow you to be tempted beyond what you are able, but with the temptation he will also provide a way out so that you may be able to bear it.",
  category: "strength"
};

export function useDailyVerse() {
  return useQuery({
    queryKey: ["dailyVerse"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return SAMPLE_VERSE;
      }

      // Get the total count of verses
      const { count } = await supabase
        .from('daily_verses')
        .select('*', { count: 'exact', head: true });

      if (!count) {
        console.error('No verses found in the database');
        return SAMPLE_VERSE;
      }

      // Get a random offset
      const randomOffset = Math.floor(Math.random() * count);

      // Get a random verse using offset
      const { data, error } = await supabase
        .from('daily_verses')
        .select('*')
        .range(randomOffset, randomOffset)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching daily verse:', error);
        throw error;
      }

      return data || SAMPLE_VERSE;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });
}