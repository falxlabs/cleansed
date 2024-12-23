import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingStepManager } from "./OnboardingStepManager";
import { validateStep } from "@/utils/onboardingValidation";
import { saveOnboardingData } from "@/utils/onboardingStorage";

const TOTAL_STEPS = 6;

export function OnboardingContainer() {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleNext = () => {
    if (!validateStep(currentStep, formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

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
    if (!validateStep(currentStep, formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }
    
    saveOnboardingData(formData);
    navigate("/dashboard");
  };

  const handleComplete = async () => {
    if (!validateStep(currentStep, formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

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

        toast({
          title: "Welcome!",
          description: "Check your email to verify your account.",
        });
      }

      if ("Notification" in window) {
        Notification.requestPermission();
      }

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign up.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <Progress value={progress} className="w-full" />
      
      <Mascot
        message={
          currentStep === 1
            ? "Hi! I'm Grace, and I'll be here to support you on your journey. Let's start by understanding what you're struggling with."
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
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}
          
          {currentStep < TOTAL_STEPS ? (
            <Button onClick={handleNext}>Continue</Button>
          ) : (
            <Button onClick={handleComplete}>Complete</Button>
          )}
        </div>

        {currentStep === TOTAL_STEPS && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={handleSkip}
          >
            Skip for now
          </Button>
        )}
      </div>
    </div>
  );
}