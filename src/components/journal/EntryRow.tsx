import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

interface Entry {
  id: number;
  date: Date;
  type: string;
  resisted: boolean;
  level: string;
  trigger: string;
  notes: string;
  mood?: number;
  affirmation?: string;
}

interface EntryRowProps {
  entry: Entry;
  onClick: (entry: Entry) => void;
}

const getTimeEmoji = (hour: number) => {
  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "☀️";
  if (hour >= 17 && hour < 21) return "🌆";
  return "🌙";
};

const getSeverityEmoji = (level: string) => {
  const levelLower = level.toLowerCase();
  if (levelLower.includes("low")) return "🟢";
  if (levelLower.includes("medium")) return "🟡";
  if (levelLower.includes("high")) return "🟠";
  return "🔴";
};

export const EntryRow = ({ entry, onClick }: EntryRowProps) => {
  const isCheckIn = entry.type === "Daily check-in";
  
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onClick(entry)}
    >
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">
            {format(entry.date, "EEE, MMM d, yyyy")}
          </span>
          <span className="text-sm text-muted-foreground">
            {getTimeEmoji(entry.date.getHours())} {format(entry.date, "h:mm a")}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <span className="font-medium">
          {isCheckIn ? "Check-in" : "Temptation"}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <span className="text-xl">
          {getSeverityEmoji(entry.level)}
        </span>
      </TableCell>
      <TableCell className="text-center">
        {!isCheckIn && (
          entry.resisted ? (
            <Check className="inline h-5 w-5 text-green-500" />
          ) : (
            <X className="inline h-5 w-5 text-red-500" />
          )
        )}
      </TableCell>
    </TableRow>
  );
};