import { format } from "date-fns";
import { getTimeEmoji } from "@/utils/timeEmoji";

interface DateDisplayProps {
  date: Date;
}

export const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium whitespace-nowrap">
        {format(date, "MMM d")}
        <span className="hidden sm:inline">, {format(date, "yyyy")}</span>
      </span>
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {getTimeEmoji(date.getHours())} {format(date, "h:mm a")}
      </span>
    </div>
  );
};