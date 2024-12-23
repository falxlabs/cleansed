import { useState, useEffect } from "react";
import { saveJournalEntry } from "@/utils/journalEntries";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
    const savedSin = localStorage.getItem("defaultTemptation");
    const savedLevel = localStorage.getItem("defaultTemptationLevel");
    
    if (savedSin) setSelectedTemptation(savedSin);
    if (savedLevel) setTemptationLevel([parseInt(savedLevel)]);
  }, []);

  const handleComplete = () => {
    saveJournalEntry({
      date: new Date(),
      type: "Daily check-in",
      level: String(temptationLevel[0]),
      trigger: selectedTemptation,
      notes: description,
      mood: mood[0],
      affirmation: selectedStatement,
      resisted: true,
      description: description,
    });

    toast({
      title: "Check-in Complete",
      description: "Your daily check-in has been saved.",
    });
    navigate("/");
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