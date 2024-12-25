import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

export type TemptationLevel = typeof TEMPTATION_LEVELS[number];

export function useReflectionState() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState(1);
  const [selectedSin, setSelectedSin] = useState<string>("");
  const [customNote, setCustomNote] = useState("");
  const defaultSliderValue = [0];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);
  const defaultLevelIndex = 0;
  const [temptationLevel, setTemptationLevel] = useState<TemptationLevel>(TEMPTATION_LEVELS[defaultLevelIndex]);
  const [trigger, setTrigger] = useState("");
  const [resistanceStrategy, setResistanceStrategy] = useState("");
  const [outcome, setOutcome] = useState<"resisted" | "gave-in">();
  const [mascotMessage, setMascotMessage] = useState("Let's reflect on this temptation together. I'm here to help you through this process.");

  useEffect(() => {
    const storedOutcome = sessionStorage.getItem('pastTemptationOutcome');
    if (storedOutcome) {
      setOutcome(storedOutcome as "resisted" | "gave-in");
    }
  }, []);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const levelIndex = Math.floor((value[0] / 100) * TEMPTATION_LEVELS.length);
    setTemptationLevel(TEMPTATION_LEVELS[Math.min(levelIndex, TEMPTATION_LEVELS.length - 1)]);
  };

  const getValidationMessage = (step: number) => {
    if (step === 1 && !selectedSin) {
      return "Please select a type of temptation first.";
    }
    if (step === 2 && !temptationLevel) {
      return "Please indicate how intense this temptation was.";
    }
    if (step === 3 && !trigger) {
      return "You need to enter what triggered this temptation.";
    }
    if (step === 4 && outcome === "resisted" && !resistanceStrategy) {
      return "You need to enter what helped you resist.";
    }
    return "";
  };

  return {
    step,
    setStep,
    selectedSin,
    setSelectedSin,
    customNote,
    setCustomNote,
    sliderValue,
    temptationLevel,
    trigger,
    setTrigger,
    resistanceStrategy,
    setResistanceStrategy,
    outcome,
    mascotMessage,
    setMascotMessage,
    handleSliderChange,
    getValidationMessage,
    navigate,
    location,
  };
}