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

      // First, create or update user affirmation if provided
      let affirmationId = null;
      if (selectedStatement) {
        const { data: userAffirmation, error: affirmationError } = await supabase
          .from('user_affirmations')
          .upsert({
            user_id: user.id,
            content: selectedStatement
          })
          .select()
          .single();

        if (affirmationError) {
          console.error('Error saving affirmation:', affirmationError);
          throw new Error('Failed to save affirmation');
        }

        affirmationId = userAffirmation?.id;
      }

      // Create journal entry
      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          entry_type: 'check-in',
          user_id: user.id
        })
        .select()
        .single();

      if (journalError) {
        console.error('Error creating journal entry:', journalError);
        throw new Error('Failed to create journal entry');
      }

      // Create check-in entry
      const { error: checkInError } = await supabase
        .from('checkin_entries')
        .insert({
          id: journalEntry.id,
          mood_score: mood[0],
          mood_description: description,
          custom_affirmation_id: affirmationId
        });

      if (checkInError) {
        console.error('Error creating check-in entry:', checkInError);
        throw new Error('Failed to save check-in details');
      }

      // If temptation is selected, create temptation entry
      if (selectedTemptation) {
        const { error: temptationError } = await supabase
          .from('temptation_entries')
          .insert({
            id: journalEntry.id,
            temptation_type: selectedTemptation,
            intensity_level: temptationLevel[0],
            trigger: description,
            resisted: true
          });

        if (temptationError) {
          console.error('Error creating temptation entry:', temptationError);
          throw new Error('Failed to save temptation details');
        }
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