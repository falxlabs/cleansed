import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntryRow } from "./EntryRow";

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

interface EntriesTableProps {
  entries: Entry[];
}

export const EntriesTable = ({ entries }: EntriesTableProps) => {
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-center">Sin</TableHead>
          <TableHead className="text-center">Intensity</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.map((entry) => (
          <EntryRow 
            key={entry.id} 
            entry={entry}
          />
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