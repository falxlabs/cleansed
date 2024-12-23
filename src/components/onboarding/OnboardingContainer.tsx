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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
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