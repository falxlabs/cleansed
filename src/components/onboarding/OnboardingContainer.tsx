import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingStepManager } from "./OnboardingStepManager";
import { validateStep } from "@/utils/onboardingValidation";
import { saveOnboardingData } from "@/utils/onboardingStorage";

const TOTAL_STEPS = 7;

export function OnboardingContainer() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    temptationType: "Pride",
    temptationLevel: [50],
    affirmation: "",
    checkInTime: "09:00",
    firstName: "",
    age: "",
    email: "",
  });

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
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
    try {
      saveOnboardingData(formData);

      if (formData.email) {
        const { error: signUpError } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
            emailRedirectTo: window.location.origin + '/dashboard',
          }
        });

        if (signUpError) throw signUpError;
        
        // Move to magic link step after successful email send
        handleNext();
        return;
      }

      if ("Notification" in window) {
        Notification.requestPermission();
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

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
        
        <div className="flex justify-between pt-4">
          {currentStep > 1 && currentStep < 7 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}
          
          {currentStep < TOTAL_STEPS - 1 ? (
            <Button 
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
            >
              Continue
            </Button>
          ) : currentStep === TOTAL_STEPS - 1 ? (
            <Button 
              onClick={handleComplete}
              disabled={!isCurrentStepValid()}
            >
              Complete
            </Button>
          ) : null}
        </div>

        {currentStep === TOTAL_STEPS - 1 && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={handleSkip}
            disabled={!isCurrentStepValid()}
          >
            Skip for now
          </Button>
        )}
      </div>
    </div>
  );
}