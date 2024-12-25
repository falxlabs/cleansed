import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CheckInDetails } from "./CheckInDetails";
import { TemptationDetails } from "./TemptationDetails";
import { EntryDialogHeader } from "./EntryDialogHeader";
import { DeleteEntryButton } from "./DeleteEntryButton";
import { useDeleteEntry } from "./useDeleteEntry";

interface EntryDetailsDialogProps {
  entry: {
    id: number;
    date: Date;
    type: string;
    resisted: boolean;
    level: string;
    trigger: string;
    notes: string;
    mood?: number;
    affirmation?: string;
    description?: string;
  } | null;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
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

export const EntryDetailsDialog = ({ entry, onOpenChange, onDelete, showDelete = true }: EntryDetailsDialogProps) => {
  const { deleteEntry } = useDeleteEntry(onDelete, () => onOpenChange(false));

  if (!entry) return null;

  const isCheckIn = entry.type.toLowerCase().includes("check-in");

  const handleDelete = () => {
    if (!entry) return;
    deleteEntry(entry.id, isCheckIn);
  };

  return (
    <Dialog open={!!entry} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <EntryDialogHeader 
          date={entry.date}
          isCheckIn={isCheckIn}
        />
        
        {isCheckIn ? (
          <CheckInDetails entry={entry} />
        ) : (
          <TemptationDetails entry={entry} />
        )}
        
        {showDelete && <DeleteEntryButton onClick={handleDelete} />}
      </DialogContent>
    </Dialog>
  );
};