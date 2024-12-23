import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodStep } from "./MoodStep";
import { TemptationStep } from "./TemptationStep";
import { MissionStep } from "./MissionStep";
import { useToast } from "@/hooks/use-toast";

interface DailyCheckinProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DailyCheckin({ open, onOpenChange }: DailyCheckinProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number[]>([50]);
  const [description, setDescription] = useState("");
  const [selectedTemptation, setSelectedTemptation] = useState("");
  const [temptationLevel, setTemptationLevel] = useState<number[]>([50]);
  const [selectedStatement, setSelectedStatement] = useState("");

  const handleNext = () => {
    if (step === 3) {
      // Submit the check-in
      toast({
        title: "Check-in Complete!",
        description: "Thank you for your daily check-in.",
      });
      onOpenChange(false);
      resetForm();
    } else {
      setStep(step + 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setMood([50]);
    setDescription("");
    setSelectedTemptation("");
    setTemptationLevel([50]);
    setSelectedStatement("");
  };

  const isNextDisabled = () => {
    if (step === 2) return !selectedTemptation;
    if (step === 3) return !selectedStatement;
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Daily Check-in</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <MoodStep
              mood={mood}
              description={description}
              onMoodChange={setMood}
              onDescriptionChange={setDescription}
            />
          )}
          {step === 2 && (
            <TemptationStep
              selectedTemptation={selectedTemptation}
              temptationLevel={temptationLevel}
              onTemptationChange={setSelectedTemptation}
              onLevelChange={setTemptationLevel}
            />
          )}
          {step === 3 && (
            <MissionStep
              selectedStatement={selectedStatement}
              onStatementChange={setSelectedStatement}
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => (step === 1 ? onOpenChange(false) : setStep(step - 1))}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={handleNext} disabled={isNextDisabled()}>
            {step === 3 ? "Complete" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}