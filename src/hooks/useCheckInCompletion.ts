import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TemptationType } from "@/types/database";

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
          intensity_level: selectedTemptation ? temptationLevel[0] : null
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