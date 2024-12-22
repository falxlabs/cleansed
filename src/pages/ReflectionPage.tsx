import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/components/ui/use-toast";

const reflectionSteps = [
  {
    question: "What triggered this temptation?",
    placeholder: "Describe what led to this moment...",
  },
  {
    question: "How are you feeling right now?",
    placeholder: "Express your current emotions...",
  },
  {
    question: "What scripture verses come to mind that could help in this situation?",
    placeholder: "Share any Bible verses that resonate with you...",
  },
  {
    question: "What can you learn from this experience?",
    placeholder: "Reflect on the lessons learned...",
  },
];

export default function ReflectionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(reflectionSteps.length).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const progress = ((currentStep + 1) / reflectionSteps.length) * 100;
  const isLastStep = currentStep === reflectionSteps.length - 1;

  const handleNext = () => {
    if (answers[currentStep].trim().length < 10) {
      toast({
        title: "Please reflect more deeply",
        description: "Try to write at least a few sentences.",
        variant: "destructive",
      });
      return;
    }

    if (isLastStep) {
      toast({
        title: "Reflection Complete",
        description: "Thank you for taking time to reflect on this experience.",
      });
      navigate("/");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
      <Mascot
        message="Take your time to reflect deeply. This will help you grow stronger in your faith."
        className="animate-fade-in"
      />

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-center">
            Step {currentStep + 1} of {reflectionSteps.length}
          </h2>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {reflectionSteps[currentStep].question}
          </h3>
          <Textarea
            value={answers[currentStep]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={reflectionSteps[currentStep].placeholder}
            className="min-h-[200px]"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            className="bg-sage-600 hover:bg-sage-700 text-white"
          >
            {isLastStep ? "Complete Reflection" : "Next Step"}
          </Button>
        </div>
      </Card>
    </div>
  );
}