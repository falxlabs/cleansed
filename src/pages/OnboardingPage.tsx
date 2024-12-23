import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { Mascot } from "@/components/dashboard/Mascot";

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
      // Here you would typically handle the signup process
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
                <h2 className="text-2xl font-bold text-center">What's your main struggle?</h2>
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

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">What's your first name?</h2>
                <p className="text-center text-muted-foreground">
                  We'll use this to personalize your experience
                </p>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-lg"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">What's your age?</h2>
                <p className="text-center text-muted-foreground">
                  This helps us provide age-appropriate guidance
                </p>
                <Input
                  type="number"
                  min="13"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="text-lg"
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Almost there!</h2>
                <p className="text-center text-muted-foreground">
                  Enter your email to create your account
                </p>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg"
                />
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="ghost" onClick={handleBack}>
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              <Button onClick={handleNext}>
                {step === totalSteps ? "Create Account" : "Next"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}