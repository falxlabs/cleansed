import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { saveOnboardingData } from "@/utils/onboardingStorage";
import { useOnboardingForm } from "./useOnboardingForm";
import { useProfileManagement } from "./useProfileManagement";

export type { OnboardingFormData } from "./useOnboardingForm";
export { TOTAL_STEPS } from "./useOnboardingForm";

export function useOnboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useProfileManagement();
  const {
    currentStep,
    formData,
    progress,
    handleFormDataChange,
    handleNext,
    handleBack,
    isCurrentStepValid,
  } = useOnboardingForm();

  const handleSkip = async () => {
    saveOnboardingData(formData);
    await updateProfile({
      firstName: formData.firstName,
      age: formData.age,
    });
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
      await updateProfile({
        firstName: formData.firstName,
        age: formData.age,
        email: formData.email,
      });

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
    progress,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    handleComplete,
    isCurrentStepValid,
  };
}