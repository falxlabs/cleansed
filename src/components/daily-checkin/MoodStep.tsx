import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

interface MoodStepProps {
  mood: number[];
  description: string;
  onMoodChange: (value: number[]) => void;
  onDescriptionChange: (value: string) => void;
}

export function MoodStep({
  mood,
  description,
  onMoodChange,
  onDescriptionChange,
}: MoodStepProps) {
  const getMoodEmoji = () => {
    if (mood[0] <= 20) return "😢";
    if (mood[0] <= 40) return "😕";
    if (mood[0] <= 60) return "😐";
    if (mood[0] <= 80) return "🙂";
    return "😊";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">How was your day?</h2>
      
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-2 border-primary/20">
        <div className="text-center space-y-4">
          <span className="text-6xl block">{getMoodEmoji()}</span>
          <Slider
            value={mood}
            onValueChange={onMoodChange}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Not Great</span>
            <span>Amazing!</span>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Want to describe your day? (Optional)
        </label>
        <Textarea
          placeholder="Share your thoughts..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-[100px] bg-white/50 backdrop-blur-sm border-2 border-primary/20"
        />
      </div>
    </div>
  );
}