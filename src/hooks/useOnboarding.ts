import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { saveOnboardingData } from "@/utils/onboardingStorage";
import { useOnboardingForm } from "./useOnboardingForm";
import { useProfileManagement } from "./useProfileManagement";
import type { Database } from "@/integrations/supabase/types";

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

  const saveOnboardingDataToDatabase = async (userId: string) => {
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          age: formData.age ? parseInt(formData.age) : null,
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      // Save notification settings
      const { error: notificationError } = await supabase
        .from('notification_settings')
        .upsert({
          user_id: userId,
          check_in_time: formData.checkInTime,
        });

      if (notificationError) throw notificationError;

      // Save temptation settings with proper type casting
      const temptationType = formData.temptationType.toLowerCase() as Database["public"]["Enums"]["temptation_type"];
      const { error: temptationError } = await supabase
        .from('temptation_settings')
        .upsert({
          user_id: userId,
          default_type: temptationType,
          default_intensity: formData.temptationLevel[0],
        });

      if (temptationError) throw temptationError;

      // Save custom affirmation if provided
      if (formData.affirmation) {
        const { error: affirmationError } = await supabase
          .from('user_affirmations')
          .insert({
            user_id: userId,
            content: formData.affirmation,
          });

        if (affirmationError) throw affirmationError;
      }

      console.log('Successfully saved onboarding data to database');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  };

  const handleSkip = async () => {
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
      const { data, error: signUpError } = await supabase.auth.signInWithOtp({
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

      // If we have a session (e.g., if email verification is disabled), save the data immediately
      if (data?.session?.user?.id) {
        await saveOnboardingDataToDatabase(data.session.user.id);
      }

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
    progress,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    handleComplete,
    isCurrentStepValid,
  };
}