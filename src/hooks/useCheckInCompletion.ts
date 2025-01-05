import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TemptationType } from "@/types/database";
import { useQueryClient } from "@tanstack/react-query";

interface CheckInData {
  mood: number[];
  description: string;
  selectedTemptation: TemptationType | "";
  temptationLevel: number[];
  selectedStatement: string;
}

export function useCheckInCompletion() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateUserProgress = async (userId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    // Get current user progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('current_streak, longest_streak, last_check_in')
      .eq('user_id', userId)
      .single();

    if (progressError) {
      console.error('Error fetching user progress:', progressError);
      return;
    }

    let newStreak = 1; // Default to 1 for first check-in
    
    if (progress?.last_check_in) {
      const lastCheckIn = new Date(progress.last_check_in);
      lastCheckIn.setHours(0, 0, 0, 0); // Reset time to start of day
      
      const timeDifference = today.getTime() - lastCheckIn.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysDifference === 0) {
        // If already checked in today, maintain current streak
        newStreak = progress.current_streak || 1;
      } else if (daysDifference === 1) {
        // If last check-in was yesterday, increment streak
        newStreak = (progress.current_streak || 0) + 1;
      }
      // If more than 1 day has passed, streak resets to 1 (default value)
    }

    // Update user progress
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, progress?.longest_streak || 0),
        last_check_in: today.toISOString(),
        total_checkins: (progress?.total_checkins || 0) + 1
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating user progress:', updateError);
    }
  };

  const handleComplete = async ({
    mood,
    description,
    selectedTemptation,
    temptationLevel,
    selectedStatement
  }: CheckInData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save your check-in.",
          variant: "destructive",
        });
        return;
      }

      // Create journal entry first
      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          entry_type: 'check-in',
          user_id: user.id
        })
        .select()
        .single();

      if (journalError || !journalEntry) {
        console.error('Error creating journal entry:', journalError);
        throw new Error('Failed to create journal entry');
      }

      // Create check-in entry using the journal entry ID
      const { error: checkInError } = await supabase
        .from('checkin_entries')
        .insert({
          id: journalEntry.id,
          mood_score: mood[0],
          mood_description: description,
          temptation_type: selectedTemptation || null,
          intensity_level: selectedTemptation ? temptationLevel[0] : null,
          affirmation_content: selectedStatement
        });

      if (checkInError) {
        // If check-in entry fails, delete the journal entry to maintain consistency
        await supabase
          .from('journal_entries')
          .delete()
          .eq('id', journalEntry.id);
        
        console.error('Error creating check-in entry:', checkInError);
        throw new Error('Failed to save check-in details');
      }

      // Update user progress and streak
      await updateUserProgress(user.id);

      // Invalidate the userProgress query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });

      toast({
        title: "Check-in Complete",
        description: "Your daily check-in has been saved successfully.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Error saving check-in:', error);
      toast({
        title: "Error",
        description: "Failed to save your check-in. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { handleComplete };
}