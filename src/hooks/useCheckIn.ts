import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useStreak } from "./useStreak";
import { TemptationType } from "@/types/database";

interface CheckInData {
  mood: number[];
  description: string;
  selectedTemptation: TemptationType | "";
  temptationLevel: number[];
  selectedStatement: string;
}

export function useCheckIn() {
  const { toast } = useToast();
  const { updateStreak } = useStreak();

  const createJournalEntry = async (userId: string) => {
    const { data: journalEntry, error } = await supabase
      .from('journal_entries')
      .insert({
        entry_type: 'check-in',
        user_id: userId
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating journal entry:', error);
      throw new Error('Failed to create journal entry');
    }

    return journalEntry;
  };

  const createCheckInEntry = async (journalEntryId: number, data: CheckInData) => {
    const { error } = await supabase
      .from('checkin_entries')
      .insert({
        id: journalEntryId,
        mood_score: data.mood[0],
        mood_description: data.description,
        temptation_type: data.selectedTemptation || null,
        intensity_level: data.selectedTemptation ? data.temptationLevel[0] : null,
        affirmation_content: data.selectedStatement
      });

    if (error) {
      console.error('Error creating check-in entry:', error);
      throw new Error('Failed to save check-in details');
    }
  };

  const getUserProgress = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('current_streak, longest_streak, last_check_in, total_checkins')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user progress:', error);
      throw new Error('Failed to fetch user progress');
    }

    return data;
  };

  const handleCheckIn = async (data: CheckInData) => {
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

      // Create journal entry
      const journalEntry = await createJournalEntry(user.id);

      try {
        // Create check-in entry
        await createCheckInEntry(journalEntry.id, data);

        // Get current progress
        const progress = await getUserProgress(user.id);

        // Update streak
        await updateStreak({
          userId: user.id,
          lastCheckIn: progress.last_check_in ? new Date(progress.last_check_in) : null,
          currentStreak: progress.current_streak,
          longestStreak: progress.longest_streak,
          totalCheckins: progress.total_checkins
        });

        toast({
          title: "Check-in Complete",
          description: "Your daily check-in has been saved successfully.",
        });

        return true;
      } catch (error) {
        // If check-in entry fails, delete the journal entry to maintain consistency
        await supabase
          .from('journal_entries')
          .delete()
          .eq('id', journalEntry.id);
        
        throw error;
      }
    } catch (error) {
      console.error('Error saving check-in:', error);
      toast({
        title: "Error",
        description: "Failed to save your check-in. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { handleCheckIn };
}