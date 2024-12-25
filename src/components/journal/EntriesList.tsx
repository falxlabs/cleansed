import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { getTimeEmoji } from "@/utils/timeEmoji";
import { getSinEmoji } from "@/utils/sinEmoji";
import { getSeverityEmoji } from "@/utils/severityEmoji";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface EntriesListProps {
  entries: Entry[];
}

export const EntriesList = ({ entries }: EntriesListProps) => {
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-center">Sin</TableHead>
          <TableHead className="text-center">Severity</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.map((entry) => {
          const isCheckIn = entry.type.toLowerCase().includes("check-in");
          
          return (
            <TableRow key={entry.id}>
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
                  {getSinEmoji(isCheckIn ? entry.type : entry.temptation_type)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-xl">
                  {getSeverityEmoji(entry.level)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {isCheckIn ? (
                  <span className="text-muted-foreground">-</span>
                ) : entry.resisted ? (
                  <Check className="inline h-5 w-5 text-green-500" />
                ) : (
                  <X className="inline h-5 w-5 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          );
        })}
        {entries.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-8 text-muted-foreground"
            >
              No entries found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};