import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useReflectionDatabase() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const saveReflection = async (
    type: string,
    level: number,
    details: string,
    trigger: string,
    resisted: boolean,
    strategy?: string
  ) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        toast({
          title: "Not logged in",
          description: "Please log in to save your reflection",
          variant: "destructive",
        });
        return;
      }

      // Get the occurred_at time from sessionStorage if it exists (for past temptations)
      const occurredAt = sessionStorage.getItem('pastTemptationOccurredAt');
      
      // Insert the journal entry first
      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          user_id: sessionData.session.user.id,
          entry_type: 'temptation',
        })
        .select()
        .single();

      if (journalError) throw journalError;

      // Then insert the temptation entry
      const { error: temptationError } = await supabase
        .from('temptation_entries')
        .insert({
          id: journalEntry.id,
          temptation_type: type,
          intensity_level: level,
          temptation_details: details,
          trigger: trigger,
          resisted: resisted,
          resistance_strategy: strategy,
          occurred_at: occurredAt || new Date().toISOString(), // Use the stored date or current date
        });

      if (temptationError) throw temptationError;

      // Clear the sessionStorage
      sessionStorage.removeItem('pastTemptationOutcome');
      sessionStorage.removeItem('pastTemptationDate');
      sessionStorage.removeItem('pastTemptationOccurredAt');

      toast({
        title: "Reflection saved",
        description: "Your reflection has been saved successfully",
      });

      navigate('/');
    } catch (error) {
      console.error('Error saving reflection:', error);
      toast({
        title: "Error saving reflection",
        description: "There was an error saving your reflection. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { saveReflection };
}