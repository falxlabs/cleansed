import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EntryDetailsDialogProps {
  entry: {
    date: Date;
    type: string;
    resisted: boolean;
    level: string;
    trigger: string;
    notes: string;
  } | null;
  onOpenChange: (open: boolean) => void;
}

export const EntryDetailsDialog = ({ entry, onOpenChange }: EntryDetailsDialogProps) => {
  if (!entry) return null;

  return (
    <Dialog open={!!entry} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {entry.type} - {format(entry.date || new Date(), "MMMM d, yyyy")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Outcome</p>
            <p>{entry.resisted ? "Resisted" : "Gave in"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Level</p>
            <p>{entry.level}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Trigger</p>
            <p>{entry.trigger}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Notes</p>
            <p>{entry.notes}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};