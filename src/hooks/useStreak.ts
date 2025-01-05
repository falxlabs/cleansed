import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getUserLocalDate, getDateFromUTC, getDaysDifference } from "@/utils/dateUtils";

interface UpdateStreakParams {
  userId: string;
  lastCheckIn: Date | null;
  currentStreak: number;
  longestStreak: number;
  totalCheckins: number;
}

export function useStreak() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const calculateNewStreak = (lastCheckIn: Date | null, currentStreak: number) => {
    const localToday = getUserLocalDate();
    
    if (!lastCheckIn) return 1;

    const lastCheckInLocal = getDateFromUTC(lastCheckIn.toISOString());
    const daysDifference = getDaysDifference(localToday, lastCheckInLocal);

    console.log('Days since last check-in:', daysDifference);
    console.log('Last check-in (local):', lastCheckInLocal.toLocaleString());
    console.log('Today (local):', localToday.toLocaleString());

    if (daysDifference === 0) return currentStreak;
    if (daysDifference === 1) return currentStreak + 1;
    return 1; // Reset streak if more than 1 day has passed
  };

  const updateStreak = async ({
    userId,
    lastCheckIn,
    currentStreak,
    longestStreak,
    totalCheckins
  }: UpdateStreakParams) => {
    try {
      const newStreak = calculateNewStreak(lastCheckIn, currentStreak);

      const { error: updateError } = await supabase
        .from('user_progress')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, longestStreak),
          last_check_in: new Date().toISOString(),
          total_checkins: totalCheckins + 1
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating user progress:', updateError);
        throw new Error('Failed to update user progress');
      }

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });

      return newStreak;
    } catch (error) {
      console.error('Error in updateStreak:', error);
      toast({
        title: "Error",
        description: "Failed to update streak. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { updateStreak };
}