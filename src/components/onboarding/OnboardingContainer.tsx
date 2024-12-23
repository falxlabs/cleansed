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

const TOTAL_STEPS = 6;

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
    navigate("/dashboard");
  };

  const handleComplete = () => {
    // Save all the data to localStorage
    localStorage.setItem("defaultTemptation", formData.temptationType);
    localStorage.setItem("defaultTemptationLevel", formData.temptationLevel[0].toString());
    localStorage.setItem("customAffirmation", formData.affirmation);
    localStorage.setItem("checkInTime", formData.checkInTime);
    localStorage.setItem("userFirstName", formData.firstName);
    localStorage.setItem("userAge", formData.age);
    localStorage.setItem("userEmail", formData.email);
    
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    // Navigate to dashboard
    navigate("/dashboard");
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

  const getMascotMessage = () => {
    switch (currentStep) {
      case 1:
        return "Let's identify what you're struggling with.";
      case 2:
        return "How strong is this temptation in your life?";
      case 3:
        return "Choose words that will encourage you.";
      case 4:
        return "When should we check in with you?";
      case 5:
        return "Tell me a bit about yourself.";
      case 6:
        return "Almost done! Just need your email.";
      default:
        return "I'm here to help you on your journey.";
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <Progress value={progress} className="w-full" />
      
      <Mascot message={getMascotMessage()} />

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