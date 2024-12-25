import { useReflectionState } from "./useReflectionState";

export const useReflectionValidation = () => {
  const { step, selectedSin, temptationLevel, trigger, resistanceStrategy } = useReflectionState();

  const getValidationMessage = () => {
    if (step === 1 && !selectedSin) {
      return "Please select a type of temptation first. This helps us understand your struggle better.";
    }
    if (step === 2 && !temptationLevel) {
      return "Could you help me understand how intense this temptation was?";
    }
    if (step === 3 && !trigger) {
      return "What triggered this temptation? This helps prepare for similar situations.";
    }
    if (step === 4 && !resistanceStrategy) {
      return "Please share what helped you stay strong!";
    }
    return "";
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!selectedSin;
      case 2:
        return !!temptationLevel;
      case 3:
        return !!trigger;
      case 4:
        return !!resistanceStrategy;
      default:
        return true;
    }
  };

  return {
    getValidationMessage,
    isStepValid,
  };
};