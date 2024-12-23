import { useState } from "react";
import { validateStep } from "@/utils/onboardingValidation";

export interface OnboardingFormData {
  temptationType: string;
  temptationLevel: number[];
  affirmation: string;
  checkInTime: string;
  firstName: string;
  age: string;
  email: string;
}

export const TOTAL_STEPS = 7;

export function useOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    temptationType: "Pride",
    temptationLevel: [50],
    affirmation: "",
    checkInTime: "20:00",
    firstName: "",
    age: "",
    email: "",
  });

  const handleFormDataChange = (updates: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isCurrentStepValid = () => {
    return validateStep(currentStep, formData);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === TOTAL_STEPS - 1) {
      handleNext();
    }
  };

  return {
    currentStep,
    formData,
    progress: (currentStep / TOTAL_STEPS) * 100,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    isCurrentStepValid,
  };
}