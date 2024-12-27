import { TemptationTypeStep } from "./TemptationTypeStep";
import { TemptationLevelStep } from "./TemptationLevelStep";
import { AffirmationStep } from "./AffirmationStep";
import { CheckInTimeStep } from "./CheckInTimeStep";
import { ProfileStep } from "./ProfileStep";
import { SignUpStep } from "./SignUpStep";
import { MagicLinkStep } from "./MagicLinkStep";

interface OnboardingFormData {
  temptationType: string;
  temptationLevel: number[];
  affirmation: string;
  checkInTime: string;
  firstName: string;
  age: string;
  email: string;
}

interface OnboardingStepManagerProps {
  currentStep: number;
  formData: OnboardingFormData;
  onFormDataChange: (updates: Partial<OnboardingFormData>) => void;
}

export function OnboardingStepManager({
  currentStep,
  formData,
  onFormDataChange,
}: OnboardingStepManagerProps) {
  switch (currentStep) {
    case 1:
      return (
        <TemptationTypeStep
          value={formData.temptationType}
          onChange={(value) => onFormDataChange({ temptationType: value })}
        />
      );
    case 2:
      return (
        <TemptationLevelStep
          sliderValue={formData.temptationLevel}
          onSliderChange={(value) => onFormDataChange({ temptationLevel: value })}
        />
      );
    case 3:
      return (
        <AffirmationStep
          value={formData.affirmation}
          onChange={(value) => onFormDataChange({ affirmation: value })}
        />
      );
    case 4:
      return (
        <CheckInTimeStep
          value={formData.checkInTime}
          onChange={(value) => onFormDataChange({ checkInTime: value })}
        />
      );
    case 5:
      return (
        <ProfileStep
          firstName={formData.firstName}
          age={formData.age}
          onFirstNameChange={(value) => onFormDataChange({ firstName: value })}
          onAgeChange={(value) => onFormDataChange({ age: value })}
        />
      );
    case 6:
      return (
        <SignUpStep
          email={formData.email}
          onEmailChange={(value) => onFormDataChange({ email: value })}
        />
      );
    case 7:
      return (
        <MagicLinkStep 
          email={formData.email}
          firstName={formData.firstName}
          age={formData.age}
        />
      );
    default:
      return null;
  }
}