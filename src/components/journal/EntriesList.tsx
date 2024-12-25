import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { getTimeEmoji } from "@/utils/timeEmoji";
import { getSinEmoji } from "@/utils/sinEmoji";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TemptationEntry {
  temptation_type: string;
  intensity_level: number;
  resisted: boolean;
}

interface CheckInEntry {
  mood_score: number | null;
  temptation_type: string | null;
  intensity_level: number | null;
}

interface Entry {
  id: number;
  created_at: string;
  entry_type: 'check-in' | 'temptation';
  temptation_entries: TemptationEntry[];
  checkin_entries: CheckInEntry[];
}

interface EntriesListProps {
  entries: Entry[];
  showCheckIn?: boolean;
}

const getTemptationLevelText = (level: number | null) => {
  if (level === null) return "-";
  if (level <= 25) return "Low";
  if (level <= 50) return "Medium";
  if (level <= 75) return "High";
  return "Severe";
};

const getIntensityEmoji = (level: number | null) => {
  if (level === null) return "⚪️";
  if (level <= 25) return "🟢";
  if (level <= 50) return "🟡";
  if (level <= 75) return "🟠";
  return "🔴";
};

export const EntriesList = ({ entries, showCheckIn = true }: EntriesListProps) => {
  const sortedEntries = [...entries]
    .filter(entry => showCheckIn || entry.entry_type !== 'check-in')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const getTemptationType = (entry: Entry) => {
    if (entry.entry_type === 'temptation' && entry.temptation_entries?.[0]) {
      return entry.temptation_entries[0].temptation_type;
    }
    if (entry.entry_type === 'check-in' && entry.checkin_entries?.[0]) {
      return entry.checkin_entries[0].temptation_type;
    }
    return null;
  };

  const getIntensityLevel = (entry: Entry) => {
    if (entry.entry_type === 'temptation' && entry.temptation_entries?.[0]) {
      return entry.temptation_entries[0].intensity_level;
    }
    if (entry.entry_type === 'check-in' && entry.checkin_entries?.[0]) {
      return entry.checkin_entries[0].intensity_level;
    }
    return null;
  };

  const getResisted = (entry: Entry) => {
    if (entry.entry_type === 'temptation' && entry.temptation_entries?.[0]) {
      return entry.temptation_entries[0].resisted;
    }
    return null;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
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
            const isCheckIn = entry.entry_type === "check-in";
            const temptationType = getTemptationType(entry);
            const sinEmoji = getSinEmoji(temptationType || undefined);
            const intensityLevel = getIntensityLevel(entry);
            const resisted = getResisted(entry);
            const entryDate = new Date(entry.created_at);
            
            return (
              <TableRow key={entry.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {format(entryDate, "MMM d, yyyy")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getTimeEmoji(entryDate.getHours())}{" "}
                      {format(entryDate, "h:mm a")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {isCheckIn ? "Check-in" : "Temptation"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {temptationType ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xl" title={temptationType}>
                        {sinEmoji}
                      </span>
                      <span className="text-sm text-muted-foreground capitalize">
                        {temptationType}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {intensityLevel !== null ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xl" title={`Level ${intensityLevel}`}>
                        {getIntensityEmoji(intensityLevel)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {getTemptationLevelText(intensityLevel)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {!isCheckIn && resisted !== null ? (
                    <div className="flex flex-col items-center">
                      {resisted ? (
                        <>
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-muted-foreground">
                            Resisted
                          </span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-red-500" />
                          <span className="text-sm text-muted-foreground">
                            Gave in
                          </span>
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