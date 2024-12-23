import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { OnboardingStepManager } from "./OnboardingStepManager";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { useOnboarding, TOTAL_STEPS } from "@/hooks/useOnboarding";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export function OnboardingContainer() {
  const navigate = useNavigate();
  const {
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
  } = useOnboarding();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          // Save onboarding data to database when user completes email verification
          const savedData = localStorage.getItem("defaultTemptation");
          if (savedData) {
            // Update profile
            const { error: profileError } = await supabase
              .from('profiles')
              .update({
                first_name: localStorage.getItem("firstName"),
                age: localStorage.getItem("age") ? parseInt(localStorage.getItem("age")!) : null,
              })
              .eq('id', session.user.id);

            if (profileError) throw profileError;

            // Save notification settings
            const { error: notificationError } = await supabase
              .from('notification_settings')
              .upsert({
                user_id: session.user.id,
                check_in_time: localStorage.getItem("checkInTime"),
              });

            if (notificationError) throw notificationError;

            // Save temptation settings
            const { error: temptationError } = await supabase
              .from('temptation_settings')
              .upsert({
                user_id: session.user.id,
                default_type: localStorage.getItem("defaultTemptation")?.toLowerCase(),
                default_intensity: localStorage.getItem("defaultTemptationLevel") ? 
                  parseInt(localStorage.getItem("defaultTemptationLevel")!) : 50,
              });

            if (temptationError) throw temptationError;

            // Save custom affirmation if provided
            const customAffirmation = localStorage.getItem("customAffirmation");
            if (customAffirmation) {
              const { error: affirmationError } = await supabase
                .from('user_affirmations')
                .insert({
                  user_id: session.user.id,
                  content: customAffirmation,
                });

              if (affirmationError) throw affirmationError;
            }
          }
        } catch (error) {
          console.error('Error saving onboarding data after email verification:', error);
        }
        
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <Progress value={progress} className="w-full" />
      
      <Mascot
        message={
          currentStep === 1
            ? "Hi! I'm Grace, and I'll be here to support you on your journey. Let's start by understanding what you're struggling with."
            : currentStep === 7
            ? "Great! Check your email for the magic link to complete your signup."
            : "I'm here to help you every step of the way. Take your time to answer honestly."
        }
      />

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <OnboardingStepManager
          currentStep={currentStep}
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
        
        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          loading={loading}
          isStepValid={isCurrentStepValid()}
          onBack={handleBack}
          onNext={handleNext}
          onSkip={handleSkip}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}