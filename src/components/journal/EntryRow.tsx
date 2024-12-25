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
  temptation_type?: string;
}

interface EntryRowProps {
  entry: Entry;
}

export const EntryRow = ({ entry }: EntryRowProps) => {
  const isCheckIn = entry.type === 'checkin';
  
  return (
    <TableRow className="hover:bg-muted/50">
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
          {isCheckIn ? "📝" : getSinEmoji(entry.temptation_type)}
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