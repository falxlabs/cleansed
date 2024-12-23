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
      if (!user) throw new Error("No authenticated user");

      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          entry_type: 'check-in',
          user_id: user.id
        })
        .select()
        .single();

      if (journalError) throw journalError;

      const { error: checkInError } = await supabase
        .from('checkin_entries')
        .insert({
          id: journalEntry.id,
          mood_score: mood[0],
          mood_description: description
        });

      if (checkInError) throw checkInError;

      if (selectedTemptation) {
        const { error: temptationError } = await supabase
          .from('temptation_entries')
          .insert({
            id: journalEntry.id,
            temptation_type: selectedTemptation as TemptationType,
            intensity_level: temptationLevel[0],
            trigger: description,
            resisted: true
          });

        if (temptationError) throw temptationError;
      }

      toast({
        title: "Check-in Complete",
        description: "Your daily check-in has been saved.",
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