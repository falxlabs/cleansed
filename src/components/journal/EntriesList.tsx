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
  temptation_entries?: {
    temptation_type: string;
    intensity_level: number;
    resisted: boolean;
  }[];
  checkin_entries?: {
    mood_score: number;
    temptation_type: string;
    intensity_level: number;
  }[];
}

interface EntriesListProps {
  entries: Entry[];
}

export const EntriesList = ({ entries }: EntriesListProps) => {
  const sortedEntries = [...entries].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const getTemptationType = (entry: Entry) => {
    if (entry.type === 'temptation' && entry.temptation_entries?.[0]) {
      return entry.temptation_entries[0].temptation_type;
    }
    if (entry.type === 'check-in' && entry.checkin_entries?.[0]) {
      return entry.checkin_entries[0].temptation_type;
    }
    return undefined;
  };

  const getIntensityLevel = (entry: Entry) => {
    if (entry.type === 'temptation' && entry.temptation_entries?.[0]) {
      return entry.temptation_entries[0].intensity_level.toString();
    }
    if (entry.type === 'check-in' && entry.checkin_entries?.[0]) {
      return entry.checkin_entries[0].intensity_level?.toString();
    }
    return "0";
  };

  const getResisted = (entry: Entry) => {
    if (entry.type === 'temptation' && entry.temptation_entries?.[0]) {
      return entry.temptation_entries[0].resisted;
    }
    return undefined;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Entry Type</TableHead>
          <TableHead className="text-center">Sin Type</TableHead>
          <TableHead className="text-center">Intensity</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
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
            const temptationType = getTemptationType(entry);
            const sinEmoji = getSinEmoji(temptationType);
            const intensityLevel = getIntensityLevel(entry);
            const resisted = getResisted(entry);
            
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
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {isCheckIn ? "Daily Check-in" : "Temptation"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(entry.date, "EEEE")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {isCheckIn ? (
                    <span className="text-muted-foreground">-</span>
                  ) : sinEmoji ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xl" title={temptationType}>
                        {sinEmoji}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {temptationType}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Unknown</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isCheckIn ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-xl" title={`Level: ${intensityLevel}`}>
                        {getSeverityEmoji(intensityLevel)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Level {intensityLevel}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isCheckIn ? (
                    <span className="text-muted-foreground">-</span>
                  ) : resisted !== undefined ? (
                    <div className="flex flex-col items-center">
                      {resisted ? (
                        <>
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="text-xs text-muted-foreground">Resisted</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-red-500" />
                          <span className="text-xs text-muted-foreground">Failed</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
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