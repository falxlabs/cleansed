import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { saveOnboardingData } from "@/utils/onboardingStorage";
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

export function useOnboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>({
    temptationType: "Pride",
    temptationLevel: [50],
    affirmation: "",
    checkInTime: "09:00",
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
    saveOnboardingData(formData);
    navigate("/dashboard");
  };

  const handleComplete = async () => {
    if (!formData.email) {
      handleSkip();
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            age: formData.age ? parseInt(formData.age) : null,
          }
        }
      });

      if (signUpError) throw signUpError;

      saveOnboardingData(formData);

      toast({
        title: "Check your email",
        description: "We've sent you a magic link to complete your signup.",
      });

      if ("Notification" in window) {
        Notification.requestPermission();
      }

      handleNext();
    } catch (error) {
      console.error("Error during sign up:", error);
      toast({
        title: "Error",
        description: "There was a problem signing you up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    formData,
    loading,
    progress: (currentStep / TOTAL_STEPS) * 100,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    handleComplete,
    isCurrentStepValid,
  };
}