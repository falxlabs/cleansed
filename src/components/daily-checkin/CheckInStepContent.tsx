import { MoodStep } from "./MoodStep";
import { TemptationStep } from "./TemptationStep";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { MissionStep } from "./MissionStep";
import { TemptationType } from "@/types/database";

interface CheckInStepContentProps {
  step: number;
  mood: number[];
  description: string;
  selectedTemptation: TemptationType | "";
  temptationLevel: number[];
  selectedStatement: string;
  onMoodChange: (value: number[]) => void;
  onDescriptionChange: (value: string) => void;
  onTemptationChange: (value: TemptationType | "") => void;
  onTemptationLevelChange: (value: number[]) => void;
  onStatementChange: (value: string) => void;
}

export function CheckInStepContent({
  step,
  mood,
  description,
  selectedTemptation,
  temptationLevel,
  selectedStatement,
  onMoodChange,
  onDescriptionChange,
  onTemptationChange,
  onTemptationLevelChange,
  onStatementChange,
}: CheckInStepContentProps) {
  const getTemptationLevelText = (value: number) => {
    if (value <= 25) return "Low - I can resist easily";
    if (value <= 50) return "Medium - It's challenging but manageable";
    if (value <= 75) return "High - I struggle significantly";
    return "Severe - Almost impossible to resist";
  };

  switch(step) {
    case 1:
      return (
        <MoodStep
          mood={mood}
          description={description}
          onMoodChange={onMoodChange}
          onDescriptionChange={onDescriptionChange}
        />
      );
    case 2:
      return (
        <TemptationStep
          selectedTemptation={selectedTemptation}
          onTemptationChange={onTemptationChange}
        />
      );
    case 3:
      return (
        <TemptationLevelStep
          sliderValue={temptationLevel}
          temptationLevel={getTemptationLevelText(temptationLevel[0])}
          onSliderChange={onTemptationLevelChange}
        />
      );
    case 4:
      return (
        <MissionStep
          selectedStatement={selectedStatement}
          onStatementChange={onStatementChange}
        />
      );
    default:
      return null;
  }
}