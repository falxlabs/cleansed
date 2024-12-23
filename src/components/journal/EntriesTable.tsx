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

export const EntriesTable = ({ entries, onEntryClick }: EntriesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
          <TableHead className="text-center">Reflection</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow
            key={entry.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onEntryClick(entry)}
          >
            <TableCell className="font-medium">
              {format(entry.date, "MMM d")}
            </TableCell>
            <TableCell>{entry.type}</TableCell>
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