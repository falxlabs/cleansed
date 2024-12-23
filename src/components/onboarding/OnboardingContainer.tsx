import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { TemptationTypeStep } from "@/components/onboarding/TemptationTypeStep";
import { TemptationLevelStep } from "@/components/onboarding/TemptationLevelStep";
import { AffirmationStep } from "@/components/onboarding/AffirmationStep";
import { CheckInTimeStep } from "@/components/onboarding/CheckInTimeStep";
import { ProfileStep } from "@/components/onboarding/ProfileStep";
import { SignUpStep } from "@/components/onboarding/SignUpStep";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.temptationType.length > 0;
      case 2:
        return formData.temptationLevel.length > 0;
      case 3:
        return formData.affirmation.length > 0;
      case 4:
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.checkInTime);
      case 5:
        return formData.firstName.length >= 2;
      case 6:
        return formData.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      default:
        return true;
    }
  };

  const saveDataLocally = () => {
    localStorage.setItem("defaultTemptation", formData.temptationType);
    localStorage.setItem("defaultTemptationLevel", formData.temptationLevel[0].toString());
    localStorage.setItem("affirmationType", "custom");
    localStorage.setItem("customAffirmation", formData.affirmation);
    localStorage.setItem("checkInTime", formData.checkInTime);
    if (formData.firstName) {
      localStorage.setItem("firstName", formData.firstName);
    }
    if (formData.age) {
      localStorage.setItem("age", formData.age);
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
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
    if (!validateCurrentStep()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }
    
    saveDataLocally();
    navigate("/dashboard");
  };

  const handleComplete = async () => {
    if (!validateCurrentStep()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    try {
      saveDataLocally();

      // Only attempt to sign up if email is provided
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

      // Request notification permission
      if ("Notification" in window) {
        Notification.requestPermission();
      }

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign up.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TemptationTypeStep
            value={formData.temptationType}
            onChange={(value) => setFormData({ ...formData, temptationType: value })}
          />
        );
      case 2:
        return (
          <TemptationLevelStep
            sliderValue={formData.temptationLevel}
            onSliderChange={(value) => setFormData({ ...formData, temptationLevel: value })}
          />
        );
      case 3:
        return (
          <AffirmationStep
            value={formData.affirmation}
            onChange={(value) => setFormData({ ...formData, affirmation: value })}
          />
        );
      case 4:
        return (
          <CheckInTimeStep
            value={formData.checkInTime}
            onChange={(value) => setFormData({ ...formData, checkInTime: value })}
          />
        );
      case 5:
        return (
          <ProfileStep
            firstName={formData.firstName}
            age={formData.age}
            onFirstNameChange={(value) => setFormData({ ...formData, firstName: value })}
            onAgeChange={(value) => setFormData({ ...formData, age: value })}
          />
        );
      case 6:
        return (
          <SignUpStep
            email={formData.email}
            onEmailChange={(value) => setFormData({ ...formData, email: value })}
          />
        );
      default:
        return null;
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
        {renderStep()}
        
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