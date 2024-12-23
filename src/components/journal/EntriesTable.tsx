import { format } from "date-fns";
import { Check, X } from "lucide-react";
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
}

interface EntriesTableProps {
  entries: Entry[];
  onEntryClick: (entry: Entry) => void;
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

const getSinEmoji = (type: string) => {
  const sinType = type.toLowerCase();
  if (sinType.includes("pride")) return "👑";
  if (sinType.includes("greed")) return "💰";
  if (sinType.includes("lust")) return "💋";
  if (sinType.includes("envy")) return "💚";
  if (sinType.includes("gluttony")) return "🍽️";
  if (sinType.includes("wrath")) return "😠";
  if (sinType.includes("sloth")) return "🦥";
  return null;
};

const formatEntryType = (type: string) => {
  if (type === "Daily check-in") {
    return { category: "Check-in", subtype: null };
  }
  
  const sins = ["Pride", "Greed", "Lust", "Envy", "Gluttony", "Wrath", "Sloth"];
  const matchedSin = sins.find(sin => type.includes(sin));
  
  return {
    category: "Temptation",
    subtype: matchedSin || null
  };
};

export const EntriesTable = ({ entries, onEntryClick }: EntriesTableProps) => {
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-center">Severity</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.map((entry) => {
          const { category, subtype } = formatEntryType(entry.type);
          const sinEmoji = subtype ? getSinEmoji(subtype) : null;
          
          return (
            <TableRow
              key={entry.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onEntryClick(entry)}
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
                <div className="flex flex-col">
                  <span className="font-medium">{category}</span>
                  {subtype && (
                    <span className="text-sm text-muted-foreground">
                      {sinEmoji} {subtype}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-xl">
                  {getSeverityEmoji(entry.level)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {category === "Temptation" ? (
                  entry.resisted ? (
                    <Check className="inline h-5 w-5 text-green-500" />
                  ) : (
                    <X className="inline h-5 w-5 text-red-500" />
                  )
                ) : (
                  <span>-</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
        {entries.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
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