import { format } from "date-fns";
import { getTimeEmoji } from "@/utils/timeEmoji";

interface DateDisplayProps {
  date: Date;
}

export const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium">
        {format(date, "EEE, MMM d, yyyy")}
      </span>
      <span className="text-sm text-muted-foreground">
        {getTimeEmoji(date.getHours())} {format(date, "h:mm a")}
      </span>
    </div>
  );
};