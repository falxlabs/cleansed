import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { Card } from "@/components/ui/card";

const SINS = [
  { name: "Pride", emoji: "👑", description: "Excessive belief in own abilities" },
  { name: "Greed", emoji: "💰", description: "Desire for material possessions" },
  { name: "Lust", emoji: "💝", description: "Intense or uncontrolled desires" },
  { name: "Envy", emoji: "👀", description: "Desire for others' traits or possessions" },
  { name: "Gluttony", emoji: "🍽️", description: "Overindulgence or overconsumption" },
  { name: "Wrath", emoji: "😠", description: "Uncontrolled feelings of anger" },
  { name: "Sloth", emoji: "🦥", description: "Failure to act and utilize talents" }
] as const;

const TEMPTATION_LEVELS = [
  { level: "Low - I can resist easily", emoji: "🟢", description: "I feel confident in my ability to resist" },
  { level: "Medium - It's challenging but manageable", emoji: "🟡", description: "I need to be mindful but can handle it" },
  { level: "High - I struggle significantly", emoji: "🟠", description: "This is a serious challenge for me" },
  { level: "Severe - Almost impossible to resist", emoji: "🔴", description: "I need immediate support and guidance" }
] as const;

export default function ReflectionPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedSin, setSelectedSin] = useState<typeof SINS[number]["name"] | "">("");
  const [customNote, setCustomNote] = useState("");
  const [temptationLevel, setTemptationLevel] = useState<typeof TEMPTATION_LEVELS[number]["level"] | "">("");
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
              onValueChange={(value) => setSelectedSin(value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {SINS.map(({ name, emoji, description }) => (
                <Card
                  key={name}
                  className={`relative p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedSin === name ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <RadioGroupItem value={name} id={name} className="absolute right-4 top-4" />
                  <Label htmlFor={name} className="cursor-pointer">
                    <div className="flex flex-col space-y-2">
                      <span className="text-3xl">{emoji}</span>
                      <span className="font-semibold">{name}</span>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </Label>
                </Card>
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
              onValueChange={(value) => setTemptationLevel(value)}
              className="space-y-4"
            >
              {TEMPTATION_LEVELS.map(({ level, emoji, description }) => (
                <Card
                  key={level}
                  className={`relative p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    temptationLevel === level ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <RadioGroupItem value={level} id={level} className="absolute right-4 top-4" />
                  <Label htmlFor={level} className="cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{emoji}</span>
                      <div>
                        <div className="font-semibold">{level}</div>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  </Label>
                </Card>
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