import { useState } from "react";
import { useCheckInAuth } from "@/hooks/useCheckInAuth";
import { useTemptationSettings } from "@/hooks/useTemptationSettings";
import { useCheckInCompletion } from "@/hooks/useCheckInCompletion";

export function useCheckInState() {
  useCheckInAuth();
  
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number[]>([50]);
  const [description, setDescription] = useState("");
  const [selectedStatement, setSelectedStatement] = useState("");

  const {
    selectedTemptation,
    setSelectedTemptation,
    temptationLevel,
    setTemptationLevel,
    isLoading
  } = useTemptationSettings();

  const { handleComplete } = useCheckInCompletion();

  const handleNext = () => {
    if (step === 4) {
      handleComplete({
        mood,
        description,
        selectedTemptation,
        temptationLevel,
        selectedStatement
      });
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
    isLoading,
  };
}