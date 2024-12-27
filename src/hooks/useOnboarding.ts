import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { saveOnboardingData } from "@/utils/onboardingStorage";
import { useToast } from "./use-toast";
import { useOnboardingForm } from "./useOnboardingForm";
import { useProfileManagement } from "./useProfileManagement";
import { saveOnboardingDataToDatabase } from "./useOnboardingDatabase";
import { useNavigate } from "react-router-dom";
import { generateEncryptionKey, generateVerificationHash } from "@/utils/encryption";

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

      // Generate encryption key from password
      const { key, salt } = await generateEncryptionKey(formData.password);
      const verificationHash = await generateVerificationHash(key);

      // Sign up with email and password
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            age: formData.age ? parseInt(formData.age) : null,
          }
        }
      });

      if (signUpError) throw signUpError;

      // Wait for the session to be established
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (!session) {
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account before proceeding.",
        });
        handleNext();
        return;
      }

      if (!data.user) {
        throw new Error("No user data returned from signup");
      }

      // Save encryption verification hash
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ encryption_key_verification: verificationHash })
        .eq('id', data.user.id);

      if (profileError) {
        console.error('Error saving encryption verification:', profileError);
        toast({
          title: "Warning",
          description: "Your encryption setup might not have been saved correctly. Please check your settings later.",
          variant: "destructive",
        });
      }

      // Save onboarding data to database
      await saveOnboardingDataToDatabase(data.user.id, formData);
      
      // Save to local storage
      saveOnboardingData(formData);
      handleNext();

      toast({
        title: "Account created",
        description: "Please check your email to confirm your account.",
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