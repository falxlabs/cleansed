import { format } from "date-fns";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface EntryDialogHeaderProps {
  date: Date;
  isCheckIn: boolean;
}

export const EntryDialogHeader = ({ date, isCheckIn }: EntryDialogHeaderProps) => {
  const formattedDate = format(date, "EEEE, MMMM d, yyyy");
  const formattedTime = format(date, "h:mm a");

  return (
    <DialogHeader className="border-b pb-4">
      <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
        {isCheckIn ? "Daily Check-in" : "Temptation Entry"}
      </DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground font-medium">
        {formattedDate} at {formattedTime}
      </DialogDescription>
    </DialogHeader>
  );
};