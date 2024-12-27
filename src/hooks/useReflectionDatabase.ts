import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { encryptText } from "@/utils/encryption";

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
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!sessionData.session?.user) throw new Error("Please sign in to save your reflection");

      // First create the journal entry
      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          entry_type: 'temptation',
          user_id: sessionData.session.user.id,
        })
        .select()
        .single();

      if (journalError) throw journalError;

      // Encrypt sensitive details if present
      let encryptedDetails = null;
      if (customNote) {
        try {
          // For now, pass null as the encryption key - this will need to be properly implemented
          encryptedDetails = await encryptText(customNote, null);
        } catch (error) {
          console.error('Error encrypting details:', error);
        }
      }

      // Then create the temptation entry with all fields
      const { error: temptationError } = await supabase
        .from('temptation_entries')
        .insert({
          id: journalEntry.id,
          temptation_type: selectedSin.toLowerCase() as TemptationType,
          intensity_level: Math.floor((sliderValue[0] / 100) * 100),
          trigger: trigger || null,
          resisted: outcome === 'resisted',
          resistance_strategy: outcome === 'resisted' ? resistanceStrategy : null,
          temptation_details: customNote || null,
          encrypted_details: encryptedDetails
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
        description: error instanceof Error ? error.message : "Failed to save your reflection. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { saveReflection };
}