import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface JournalHeaderProps {
  showCalendar: boolean;
  onToggleCalendar: () => void;
}

export const JournalHeader = ({ showCalendar, onToggleCalendar }: JournalHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl sm:text-3xl font-bold">Journal</h1>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onToggleCalendar}
        className="flex items-center gap-2"
      >
        {showCalendar ? (
          <>Hide Calendar <ChevronUp className="h-4 w-4" /></>
        ) : (
          <>Show Calendar <ChevronDown className="h-4 w-4" /></>
        )}
      </Button>
    </div>
  );
};