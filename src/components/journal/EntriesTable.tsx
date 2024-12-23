import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntryRow } from "./EntryRow";
import { Smile, Frown, Meh } from "lucide-react";

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
  showCalendar?: boolean;
  selectedDate?: Date;
}

export const EntriesTable = ({ 
  entries, 
  onEntryClick, 
  showCalendar = false,
  selectedDate 
}: EntriesTableProps) => {
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Find check-in entry for selected date if calendar is shown
  const checkInEntry = showCalendar && selectedDate ? 
    entries.find(entry => 
      entry.type === 'check-in' && 
      entry.date.toDateString() === selectedDate.toDateString()
    ) : null;

  const getMoodEmoji = (mood?: number) => {
    if (!mood) return <Meh className="w-16 h-16 text-gray-400" />;
    if (mood >= 7) return <Smile className="w-16 h-16 text-green-500" />;
    if (mood <= 4) return <Frown className="w-16 h-16 text-red-500" />;
    return <Meh className="w-16 h-16 text-yellow-500" />;
  };

  if (showCalendar && selectedDate) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-6">
          {getMoodEmoji(checkInEntry?.mood)}
          {checkInEntry?.affirmation && (
            <p className="mt-4 text-center text-muted-foreground italic">
              "{checkInEntry.affirmation}"
            </p>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead className="text-center">Sin</TableHead>
              <TableHead className="text-center">Severity</TableHead>
              <TableHead className="text-center">Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries
              .filter(entry => 
                entry.date.toDateString() === selectedDate.toDateString() &&
                entry.type !== 'check-in'
              )
              .map((entry) => (
                <EntryRow 
                  key={entry.id} 
                  entry={entry} 
                  onClick={onEntryClick}
                />
              ))
            }
            {(!sortedEntries.some(entry => 
              entry.date.toDateString() === selectedDate.toDateString()
            )) && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No entries found for this date
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Entry</TableHead>
          <TableHead className="text-center">Sin</TableHead>
          <TableHead className="text-center">Severity</TableHead>
          <TableHead className="text-center">Outcome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEntries.map((entry) => (
          <EntryRow 
            key={entry.id} 
            entry={entry} 
            onClick={onEntryClick}
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