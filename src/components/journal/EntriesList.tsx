import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntryDetailsDialog } from "./EntryDetailsDialog";
import { EntryRow } from "./EntryRow";
import { Entry } from "./types";

interface EntriesListProps {
  entries: Entry[];
  showCheckIn?: boolean;
  onDelete?: (entries: Entry[]) => void;
}

export const EntriesList = ({ entries, showCheckIn = true, onDelete }: EntriesListProps) => {
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  
  const sortedEntries = [...entries]
    .filter(entry => showCheckIn || entry.entry_type !== 'check-in')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleEntryClick = (entry: Entry) => {
    const entryData = {
      id: entry.id,
      date: new Date(entry.created_at),
      type: entry.entry_type,
      level: entry.entry_type === 'check-in' 
        ? entry.checkin_entries[0]?.intensity_level?.toString() 
        : entry.temptation_entries[0]?.intensity_level?.toString(),
      trigger: entry.entry_type === 'check-in'
        ? entry.checkin_entries[0]?.temptation_type
        : entry.temptation_entries[0]?.temptation_type,
      notes: '',
      mood: entry.entry_type === 'check-in' ? entry.checkin_entries[0]?.mood_score : undefined,
      description: entry.entry_type === 'check-in'
        ? entry.checkin_entries[0]?.mood_description
        : entry.temptation_entries[0]?.temptation_details,
      resisted: entry.entry_type === 'temptation' ? entry.temptation_entries[0]?.resisted : undefined,
      temptation_type: entry.entry_type === 'temptation' ? entry.temptation_entries[0]?.temptation_type : undefined,
      resistance_strategy: entry.entry_type === 'temptation' ? entry.temptation_entries[0]?.resistance_strategy : undefined
    };
    setSelectedEntry(entryData);
  };

  const handleDelete = (id: number) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    if (onDelete) {
      onDelete(updatedEntries);
    }
  };

  return (
    <>
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
            sortedEntries.map((entry) => (
              <EntryRow 
                key={entry.id} 
                entry={entry} 
                onClick={() => handleEntryClick(entry)}
              />
            ))
          )}
        </TableBody>
      </Table>

      <EntryDetailsDialog
        entry={selectedEntry}
        onOpenChange={(open) => !open && setSelectedEntry(null)}
        onDelete={handleDelete}
      />
    </>
  );
};