import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type TemptationType = Database["public"]["Enums"]["temptation_type"];

interface SaveReflectionParams {
  selectedSin: string;
  sliderValue: number[];
  trigger: string;
  outcome: "resisted" | "gave-in";
  resistanceStrategy: string;
  customNote: string;
}

export function useReflectionDatabase() {
  const { toast } = useToast();

  const saveReflection = async ({
    selectedSin,
    sliderValue,
    trigger,
    outcome,
    resistanceStrategy,
    customNote,
  }: SaveReflectionParams) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // First create the journal entry
      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          entry_type: 'temptation',
          user_id: user.id,
        })
        .select()
        .single();

      if (journalError) throw journalError;

      // Then create the temptation entry
      const { error: temptationError } = await supabase
        .from('temptation_entries')
        .insert({
          id: journalEntry.id,
          temptation_type: selectedSin.toLowerCase() as TemptationType,
          intensity_level: Math.floor((sliderValue[0] / 100) * 100),
          trigger: trigger,
          resisted: outcome === 'resisted',
          resistance_strategy: outcome === 'resisted' ? resistanceStrategy : null,
          temptation_details: customNote || null,
        });

      if (temptationError) throw temptationError;

      toast({
        title: "Entry saved",
        description: "Your reflection has been saved successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Error",
        description: "Failed to save your reflection. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { saveReflection };
}