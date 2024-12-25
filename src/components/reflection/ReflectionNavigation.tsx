import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReflectionNavigationProps {
  progress: number;
  onBack: () => void;
}

export const ReflectionNavigation = ({ progress, onBack }: ReflectionNavigationProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="-ml-2"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Progress value={progress} className="flex-1" />
    </div>
  );
};