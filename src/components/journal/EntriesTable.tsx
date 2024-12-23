import { format } from "date-fns";
import { Check, X, BookOpen } from "lucide-react";
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
  hasReflection?: boolean;
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

const getTypeEmoji = (type: string) => {
  if (type === "Daily check-in") return "📝";
  if (type === "Pride") return "👑";
  if (type === "Greed") return "💰";
  if (type === "Lust") return "💋";
  if (type === "Envy") return "💚";
  if (type === "Gluttony") return "🍽️";
  if (type === "Wrath") return "😠";
  if (type === "Sloth") return "🦥";
  return "⚠️";
};

const formatType = (type: string) => {
  if (type === "Daily check-in") return "Daily check-in";
  if (type.includes("Reflection")) return type.replace("Reflection", "").trim();
  if (type.includes("Past Temptation")) return type.replace("Past Temptation", "").trim();
  return type;
};

export const EntriesTable = ({ entries, onEntryClick }: EntriesTableProps) => {
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
          <TableHead className="text-center">Reflection</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.map((entry) => (
          <TableRow
            key={entry.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onEntryClick(entry)}
          >
            <TableCell className="font-medium">
              {format(entry.date, "MMM d")}
            </TableCell>
            <TableCell>
              {getTimeEmoji(entry.date.getHours())}
            </TableCell>
            <TableCell>
              <span className="flex items-center gap-2">
                {getTypeEmoji(formatType(entry.type))} {formatType(entry.type)}
              </span>
            </TableCell>
            <TableCell className="text-center">
              {entry.resisted ? (
                <Check className="inline h-5 w-5 text-green-500" />
              ) : (
                <X className="inline h-5 w-5 text-red-500" />
              )}
            </TableCell>
            <TableCell className="text-center">
              {entry.hasReflection ? (
                <BookOpen className="inline h-5 w-5 text-blue-500" />
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
          </TableRow>
        ))}
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