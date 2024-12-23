import { TableCell, TableRow } from "@/components/ui/table";
import { DateDisplay } from "./DateDisplay";
import { StatusIcon } from "./StatusIcon";
import { getSeverityEmoji } from "@/utils/severityEmoji";
import { getSinEmoji } from "@/utils/sinEmoji";

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

export const EntryRow = ({ entry, onClick }: EntryRowProps) => {
  const isCheckIn = entry.type.toLowerCase().includes("check-in");
  
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onClick(entry)}
    >
      <TableCell>
        <DateDisplay date={entry.date} />
      </TableCell>
      <TableCell>
        <span className="font-medium">
          {isCheckIn ? "Check-in" : "Temptation"}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <span className="text-xl">
          {getSinEmoji(isCheckIn ? entry.trigger : entry.type)}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <span className="text-xl">
          {getSeverityEmoji(entry.level)}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <StatusIcon isCheckIn={isCheckIn} resisted={entry.resisted} />
      </TableCell>
    </TableRow>
  );
};