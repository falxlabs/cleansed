import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getTimeEmoji } from "@/utils/timeEmoji";
import { getSinEmoji } from "@/utils/sinEmoji";
import { EntryRowProps } from "./types";

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

export const EntryRow = ({ entry, onClick }: EntryRowProps) => {
  const isCheckIn = entry.entry_type === "check-in";
  const temptationType = isCheckIn 
    ? entry.checkin_entries[0]?.temptation_type 
    : entry.temptation_entries[0]?.temptation_type;
  const sinEmoji = getSinEmoji(temptationType || undefined);
  const intensityLevel = isCheckIn
    ? entry.checkin_entries[0]?.intensity_level
    : entry.temptation_entries[0]?.intensity_level;
  const resisted = !isCheckIn ? entry.temptation_entries[0]?.resisted : null;
  const entryDate = new Date(entry.created_at);

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onClick(entry)}
    >
      <TableCell className="min-w-[100px]">
        <div className="flex flex-col">
          <span className="font-medium whitespace-nowrap">
            {format(entryDate, "MMM d")}
            <span className="hidden sm:inline">, {format(entryDate, "yyyy")}</span>
          </span>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {getTimeEmoji(entryDate.getHours())}{" "}
            {format(entryDate, "h:mm a")}
          </span>
        </div>
      </TableCell>
      <TableCell className="min-w-[90px]">
        <span className="font-medium whitespace-nowrap">
          {isCheckIn ? "Check-in" : "Temptation"}
        </span>
      </TableCell>
      <TableCell className="text-center min-w-[80px]">
        {temptationType ? (
          <div className="flex flex-col items-center">
            <span className="text-xl" title={temptationType}>
              {sinEmoji}
            </span>
            <span className="text-sm text-muted-foreground capitalize hidden sm:block">
              {temptationType}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="text-center min-w-[80px]">
        {intensityLevel !== null ? (
          <div className="flex flex-col items-center">
            <span className="text-xl" title={`Level ${intensityLevel}`}>
              {getIntensityEmoji(intensityLevel)}
            </span>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {getTemptationLevelText(intensityLevel)}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="text-center min-w-[80px]">
        {!isCheckIn && resisted !== null ? (
          <div className="flex flex-col items-center">
            {resisted ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Resisted
                </span>
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground hidden sm:block">
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
};