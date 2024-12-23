import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OutcomeSelectionStepProps {
  resisted: boolean | null;
  onOutcomeSelect: (resisted: boolean) => void;
}

export const OutcomeSelectionStep = ({ resisted, onOutcomeSelect }: OutcomeSelectionStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">What was the outcome?</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className={`p-6 cursor-pointer transition-all duration-200 ${
            resisted === true ? 'ring-2 ring-green-500 bg-green-50/50' : 'hover:bg-muted/50'
          }`}
          onClick={() => onOutcomeSelect(true)}
        >
          <div className="flex flex-col items-center space-y-2">
            <Check className="h-8 w-8 text-green-500" />
            <span className="font-medium">I Resisted</span>
          </div>
        </Card>
        
        <Card 
          className={`p-6 cursor-pointer transition-all duration-200 ${
            resisted === false ? 'ring-2 ring-red-500 bg-red-50/50' : 'hover:bg-muted/50'
          }`}
          onClick={() => onOutcomeSelect(false)}
        >
          <div className="flex flex-col items-center space-y-2">
            <X className="h-8 w-8 text-red-500" />
            <span className="font-medium">I Gave In</span>
          </div>
        </Card>
      </div>
    </div>
  );
};