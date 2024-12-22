import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { TemptationType } from "@/components/reflection/TemptationType";
import { TemptationLevel } from "@/components/reflection/TemptationLevel";
import { TriggerDescription } from "@/components/reflection/TriggerDescription";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

type TemptationLevel = typeof TEMPTATION_LEVELS[number];

type SinType = "Pride" | "Greed" | "Lust" | "Envy" | "Gluttony" | "Wrath" | "Sloth";

export default function ReflectionPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedSin, setSelectedSin] = useState<SinType | "">("");
  const [customNote, setCustomNote] = useState("");
  const [temptationLevel, setTemptationLevel] = useState<TemptationLevel | "">("");
  const [sliderValue, setSliderValue] = useState([25]);
  const [trigger, setTrigger] = useState("");

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step === 1) {
      if (!selectedSin || !customNote) {
        toast({
          title: "Please complete all fields",
          description: "Select a type of temptation and add your note",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!temptationLevel) {
        toast({
          title: "Please select a temptation level",
          description: "This helps us understand the intensity of the struggle",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!trigger) {
        toast({
          title: "Please describe the trigger",
          description: "Understanding what triggers the temptation is important",
          variant: "destructive",
        });
        return;
      }
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
          <TemptationType
            selectedSin={selectedSin}
            setSelectedSin={setSelectedSin}
            customNote={customNote}
            setCustomNote={setCustomNote}
          />
        )}

        {step === 2 && (
          <TemptationLevel
            temptationLevel={temptationLevel}
            setTemptationLevel={setTemptationLevel}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
        )}

        {step === 3 && (
          <TriggerDescription
            trigger={trigger}
            setTrigger={setTrigger}
          />
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