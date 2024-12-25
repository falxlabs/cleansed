import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDailyVerse() {
  return useQuery({
    queryKey: ["dailyVerse"],
    queryFn: async () => {
      // Get a random verse from the daily_verses table
      const { data, error } = await supabase
        .from('daily_verses')
        .select('*')
        .order('random()')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching daily verse:', error);
        throw error;
      }

      return data;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });
}