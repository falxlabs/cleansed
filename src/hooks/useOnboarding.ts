import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { saveOnboardingData } from "@/utils/onboardingStorage";
import { useToast } from "./use-toast";
import { useOnboardingForm } from "./useOnboardingForm";
import { useProfileManagement } from "./useProfileManagement";
import { saveOnboardingDataToDatabase } from "./useOnboardingDatabase";
import type { AuthResponse } from "@supabase/supabase-js";

export type { OnboardingFormData } from "./useOnboardingForm";
export { TOTAL_STEPS } from "./useOnboardingForm";

export function useOnboarding() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { updateProfile } = useProfileManagement();
  const {
    currentStep,
    formData,
    progress,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    isCurrentStepValid,
  } = useOnboardingForm();

  const handleComplete = async () => {
    try {
      setLoading(true);

      // Sign up the user with magic link
      const { data, error: signUpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          data: {
            first_name: formData.firstName,
            age: formData.age ? parseInt(formData.age) : null,
          }
        }
      }) as AuthResponse;

      if (signUpError) throw signUpError;

      // If we have a session (e.g., if email verification is disabled), save the data immediately
      const userId = data.session?.user?.id;
      if (userId) {
        await saveOnboardingDataToDatabase(userId, formData);
      }

      saveOnboardingData(formData);
      handleNext();

      toast({
        title: "Check your email",
        description: "We've sent you a magic link to complete your signup.",
      });
    } catch (error) {
      console.error('Error during onboarding:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
    progress,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    handleComplete,
    isCurrentStepValid,
  };
}