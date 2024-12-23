import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useCheckInState() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number[]>([50]);
  const [description, setDescription] = useState("");
  const [selectedTemptation, setSelectedTemptation] = useState("");
  const [temptationLevel, setTemptationLevel] = useState<number[]>([50]);
  const [selectedStatement, setSelectedStatement] = useState("");

  useEffect(() => {
    // Load saved temptation settings
    const loadTemptationSettings = async () => {
      const { data: settings } = await supabase
        .from('temptation_settings')
        .select('default_type, default_intensity')
        .maybeSingle();
      
      if (settings) {
        if (settings.default_type) setSelectedTemptation(settings.default_type);
        if (settings.default_intensity) setTemptationLevel([settings.default_intensity]);
      }
    };

    loadTemptationSettings();
  }, []);

  const handleComplete = async () => {
    try {
      // First create the journal entry
      const { data: journalEntry, error: journalError } = await supabase
        .from('journal_entries')
        .insert({
          entry_type: 'check-in'
        })
        .select()
        .single();

      if (journalError) throw journalError;

      // Then create the check-in entry
      const { error: checkInError } = await supabase
        .from('checkin_entries')
        .insert({
          id: journalEntry.id,
          mood_score: mood[0],
          mood_description: description
        });

      if (checkInError) throw checkInError;

      // Create temptation entry if a temptation was selected
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

  const handleNext = () => {
    if (step === 4) {
      handleComplete();
      return;
    }
    setStep(step + 1);
  };

  const isNextDisabled = () => {
    if (step === 2) return !selectedTemptation;
    if (step === 3) return temptationLevel.length === 0;
    if (step === 4) return !selectedStatement;
    return false;
  };

  return {
    step,
    mood,
    setMood,
    description,
    setDescription,
    selectedTemptation,
    setSelectedTemptation,
    temptationLevel,
    setTemptationLevel,
    selectedStatement,
    setSelectedStatement,
    handleNext,
    isNextDisabled,
  };
}