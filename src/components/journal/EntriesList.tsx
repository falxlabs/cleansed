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
  const sortedEntries = [...entries].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Entry Type</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Level</TableHead>
          <TableHead className="text-center">Result</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-8 text-muted-foreground"
            >
              No entries found
            </TableCell>
          </TableRow>
        ) : (
          sortedEntries.map((entry) => {
            const isCheckIn = entry.type === "check-in";
            
            return (
              <TableRow key={entry.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {format(entry.date, "MMM d, yyyy")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getTimeEmoji(entry.date.getHours())}{" "}
                      {format(entry.date, "h:mm a")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {isCheckIn ? "Daily Check-in" : "Temptation"}
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-xl">
                    {getSinEmoji(entry.temptation_type)}
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
          })
        )}
      </TableBody>
    </Table>
  );
};