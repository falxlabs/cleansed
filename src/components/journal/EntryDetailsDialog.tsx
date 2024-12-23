import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DailyCheckInDetails } from "./CheckInDetails";
import { TemptationDetails } from "./TemptationDetails";

interface EntryDetailsDialogProps {
  entry: {
    id: number;
    date: Date;
    type: string;
    resisted: boolean;
    level: string;
    trigger: string;
    reflectionNotes: string;
    mood?: number;
    affirmation?: string;
    personalNotes?: string;
  } | null;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: number) => void;
}

export const getTemptationLevelText = (value: string) => {
  const levelValue = parseInt(value);
  if (levelValue <= 25) return "Low - I can resist easily";
  if (levelValue <= 50) return "Medium - It's challenging but manageable";
  if (levelValue <= 75) return "High - I struggle significantly";
  return "Severe - Almost impossible to resist";
};

export const getMoodEmoji = (mood?: number) => {
  if (!mood) return "😐";
  if (mood <= 20) return "😢";
  if (mood <= 40) return "😕";
  if (mood <= 60) return "😐";
  if (mood <= 80) return "🙂";
  return "😊";
};

export const getMoodText = (mood?: number) => {
  if (!mood) return "Neutral";
  if (mood <= 20) return "Very Low";
  if (mood <= 40) return "Low";
  if (mood <= 60) return "Neutral";
  if (mood <= 80) return "Good";
  return "Excellent";
};

export const EntryDetailsDialog = ({ entry, onOpenChange, onDelete }: EntryDetailsDialogProps) => {
  const { toast } = useToast();

  if (!entry) return null;

  const isDailyCheckIn = entry.type.toLowerCase().includes('check-in');
  const formattedDate = format(entry.date, "EEEE, MMMM d, yyyy");
  const formattedTime = format(entry.date, "h:mm a");

  const handleDelete = () => {
    if (entry && onDelete) {
      onDelete(entry.id);
      onOpenChange(false);
      toast({
        title: "Entry deleted",
        description: "The entry has been successfully deleted.",
      });
    }
  };

  return (
    <Dialog open={!!entry} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
            {isDailyCheckIn ? "Daily Check-in" : "Challenge Entry"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground font-medium">
            {formattedDate} at {formattedTime}
          </DialogDescription>
        </DialogHeader>
        
        {isDailyCheckIn ? (
          <DailyCheckInDetails entry={entry} />
        ) : (
          <TemptationDetails entry={entry} />
        )}
        
        <div className="flex justify-end pt-2 border-t">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-2 hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Delete Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
