import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  } | null;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: number) => void;
}

const getTemptationLevelText = (value: string) => {
  const levelValue = parseInt(value);
  if (levelValue <= 25) return "Low - I can resist easily";
  if (levelValue <= 50) return "Medium - It's challenging but manageable";
  if (levelValue <= 75) return "High - I struggle significantly";
  return "Severe - Almost impossible to resist";
};

const getMoodEmoji = (mood?: number) => {
  if (!mood) return "😐";
  if (mood <= 20) return "😢";
  if (mood <= 40) return "😕";
  if (mood <= 60) return "😐";
  if (mood <= 80) return "🙂";
  return "😊";
};

const getMoodText = (mood?: number) => {
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

  const isCheckIn = entry.type.toLowerCase().includes("check-in");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCheckIn ? "Daily Check-in" : "Temptation Entry"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {formattedDate} at {formattedTime}
          </p>
        </DialogHeader>
        <div className="space-y-4">
          {isCheckIn ? (
            <>
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-primary">Mood</p>
                  <span className="text-2xl" title={getMoodText(entry.mood)}>
                    {getMoodEmoji(entry.mood)}
                  </span>
                </div>
                <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${entry.mood || 50}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Primary Challenge</p>
                <p className="capitalize">{entry.trigger}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Intensity Level</p>
                <p>{getTemptationLevelText(entry.level)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mood Description</p>
                <p>{entry.notes || "No description provided"}</p>
              </div>
              {entry.affirmation && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Affirmation</p>
                  <p>{entry.affirmation}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type of Temptation</p>
                <p className="capitalize">{entry.type}</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">Outcome</p>
                <p className={entry.resisted ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {entry.resisted ? "✓ Successfully Resisted" : "✗ Gave in"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Intensity Level</p>
                <p>{getTemptationLevelText(entry.level)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trigger</p>
                <p>{entry.trigger || "No trigger specified"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {entry.resisted ? "What helped me resist" : "Additional Notes"}
                </p>
                <p>{entry.notes || "No notes provided"}</p>
              </div>
            </>
          )}
          <div className="flex justify-end pt-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};