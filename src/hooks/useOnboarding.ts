import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { saveOnboardingData } from "@/utils/onboardingStorage";
import { useToast } from "./use-toast";
import { useOnboardingForm } from "./useOnboardingForm";
import { useProfileManagement } from "./useProfileManagement";
import { saveOnboardingDataToDatabase } from "./useOnboardingDatabase";
import { useNavigate } from "react-router-dom";
import type { AuthResponse } from "@supabase/supabase-js";

export type { OnboardingFormData } from "./useOnboardingForm";

const TOTAL_STEPS = 7;

export function useOnboarding() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const handleComplete = async () => {
    try {
      setLoading(true);

      // First, sign up the user with magic link
      const { data, error: signUpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            age: formData.age ? parseInt(formData.age) : null,
          }
        }
      }) as AuthResponse;

      if (signUpError) throw signUpError;

      // Save user affirmation if provided
      if (formData.affirmation) {
        const { error: affirmationError } = await supabase
          .from('user_affirmations')
          .insert({
            content: formData.affirmation,
            user_id: data.session?.user?.id
          });

        if (affirmationError) {
          console.error('Error saving affirmation:', affirmationError);
          toast({
            title: "Warning",
            description: "Your affirmation might not have been saved. Please check your settings later.",
            variant: "destructive",
          });
        }
      }

      // Save other onboarding data
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

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return {
    currentStep,
    formData,
    loading,
    progress,
    totalSteps: TOTAL_STEPS,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    handleComplete,
    isCurrentStepValid,
  };
}