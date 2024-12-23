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

export const EntryDetailsDialog = ({ entry, onOpenChange, onDelete }: EntryDetailsDialogProps) => {
  const { toast } = useToast();

  if (!entry) return null;

  const isCheckIn = entry.type.toLowerCase().includes("check-in");

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
            {isCheckIn ? "Daily Check-in" : "Temptation Entry"} - {format(entry.date || new Date(), "MMMM d, yyyy")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!isCheckIn && (
            <>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type of Temptation</p>
                <p>{entry.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outcome</p>
                <p>{entry.resisted ? "Resisted" : "Gave in"}</p>
              </div>
            </>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Level</p>
            <p>{getTemptationLevelText(entry.level)}</p>
          </div>
          {!isCheckIn && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Trigger</p>
              <p>{entry.trigger}</p>
            </div>
          )}
          {isCheckIn ? (
            <>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mood Description</p>
                <p>{entry.notes}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Daily Affirmation</p>
                <p>{entry.affirmation}</p>
              </div>
            </>
          ) : (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notes</p>
              <p>{entry.notes}</p>
            </div>
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