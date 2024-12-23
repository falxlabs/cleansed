import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { Mascot } from "@/components/dashboard/Mascot";
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep";
import { NavigationButtons } from "@/components/onboarding/NavigationButtons";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  // Form state
  const [selectedSin, setSelectedSin] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [sliderValue, setSliderValue] = useState([0]);
  const [temptationLevel, setTemptationLevel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const progress = (step / totalSteps) * 100;

  const getMascotMessage = () => {
    switch (step) {
      case 1:
        return "What's your main struggle? I'm here to help you overcome it. You can be honest with me.";
      case 2:
        return "How strong is this temptation in your life? Understanding this helps me provide better support.";
      case 3:
        return "What's your name? I'd love to get to know you better!";
      case 4:
        return "Could you share your age? This helps me tailor guidance that's appropriate for you.";
      case 5:
        return "Last step! We'll need your email to create your account and begin your journey.";
      default:
        return "Let's get started on your journey!";
    }
  };

  const handleNext = () => {
    if (step === 1 && !selectedSin) {
      toast({
        title: "Please select a temptation type",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !temptationLevel) {
      toast({
        title: "Please select a temptation level",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && !firstName.trim()) {
      toast({
        title: "Please enter your first name",
        variant: "destructive",
      });
      return;
    }
    if (step === 4 && (!age || isNaN(Number(age)) || Number(age) < 13)) {
      toast({
        title: "Please enter a valid age (13+)",
        variant: "destructive",
      });
      return;
    }
    if (step === 5 && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (step === totalSteps) {
      toast({
        title: "Account created successfully!",
        description: "Welcome to Grace Bearer",
      });
      navigate("/");
      return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        <Mascot message={getMascotMessage()} className="mb-6 animate-fade-in" />
        <Card className="w-full p-6 space-y-6">
          <Progress value={progress} className="w-full" />
          
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <TemptationTypeSelector
                  value={selectedSin}
                  onChange={setSelectedSin}
                  showText={true}
                />
                <textarea
                  placeholder="Want to add more context? (optional)"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-md border"
                />
              </div>
            )}

            {step === 2 && (
              <TemptationLevelStep
                sliderValue={sliderValue}
                temptationLevel={temptationLevel}
                onSliderChange={(value) => {
                  setSliderValue(value);
                  const levels = [
                    "Low - I can resist easily",
                    "Medium - It's challenging but manageable",
                    "High - I struggle significantly",
                    "Severe - Almost impossible to resist"
                  ];
                  const index = Math.floor((value[0] / 100) * levels.length);
                  setTemptationLevel(levels[Math.min(index, levels.length - 1)]);
                }}
              />
            )}

            {(step === 3 || step === 4 || step === 5) && (
              <PersonalInfoStep
                firstName={firstName}
                setFirstName={setFirstName}
                age={age}
                setAge={setAge}
                email={email}
                setEmail={setEmail}
                step={step}
              />
            )}

            <NavigationButtons
              step={step}
              totalSteps={totalSteps}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}