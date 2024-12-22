import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";

const SINS = [
  "Pride",
  "Greed",
  "Lust",
  "Envy",
  "Gluttony",
  "Wrath",
  "Sloth"
] as const;

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

export default function ReflectionPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedSin, setSelectedSin] = useState<typeof SINS[number] | "">("");
  const [customNote, setCustomNote] = useState("");
  const [temptationLevel, setTemptationLevel] = useState<typeof TEMPTATION_LEVELS[number] | "">("");
  const [trigger, setTrigger] = useState("");

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step === 1 && (!selectedSin || !customNote)) {
      toast({
        title: "Please complete all fields",
        description: "Select a type of temptation and add your note",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !temptationLevel) {
      toast({
        title: "Please select a temptation level",
        description: "This helps us understand the intensity of the struggle",
        variant: "destructive",
      });
      return;
    }

    if (step === 3 && !trigger) {
      toast({
        title: "Please describe the trigger",
        description: "Understanding what triggers the temptation is important",
        variant: "destructive",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle completion
      toast({
        title: "Reflection completed",
        description: "Thank you for your honest reflection",
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/crossroad");
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Let's reflect on this temptation together" />
      
      <Progress value={progress} className="w-full" />

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Type of Temptation</h2>
            <RadioGroup
              value={selectedSin}
              onValueChange={(value) => setSelectedSin(value as typeof SINS[number])}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {SINS.map((sin) => (
                <div key={sin} className="flex items-center space-x-2">
                  <RadioGroupItem value={sin} id={sin} />
                  <Label htmlFor={sin}>{sin}</Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="space-y-2">
              <Label htmlFor="customNote">Describe the specific temptation</Label>
              <Textarea
                id="customNote"
                placeholder="What exactly are you struggling with?"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Temptation Level</h2>
            <RadioGroup
              value={temptationLevel}
              onValueChange={(value) => setTemptationLevel(value as typeof TEMPTATION_LEVELS[number])}
              className="space-y-4"
            >
              {TEMPTATION_LEVELS.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">What triggered this temptation?</h2>
            <Textarea
              placeholder="Describe what led to this temptation (e.g., specific situations, emotions, or events)"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === 3 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}