import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UserProgress {
  current_streak: number;
  longest_streak: number;
  last_check_in: string | null;
}

export function useUserProgress() {
  const { data: progress, isLoading, error } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_progress')
        .select('current_streak, longest_streak, last_check_in')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as UserProgress;
    },
  });

  return {
    currentStreak: progress?.current_streak ?? 0,
    longestStreak: progress?.longest_streak ?? 0,
    lastCheckIn: progress?.last_check_in ? new Date(progress.last_check_in) : null,
    isLoading,
    error
  };
}