import { Table, TableBody } from "@/components/ui/table";
import { EntryDetailsDialog } from "./EntryDetailsDialog";
import { EntryRow } from "./EntryRow";
import { Entry } from "./types";
import { useAuth } from "@/providers/AuthProvider";
import { EmptyEntriesState } from "./EmptyEntriesState";
import { EntriesTableHeader } from "./EntriesTableHeader";
import { useEntrySelection } from "./useEntrySelection";
import { JournalEntriesSkeleton } from "@/components/loading/JournalEntriesSkeleton";

interface EntriesListProps {
  entries: Entry[];
  showCheckIn?: boolean;
  onDelete?: (entries: Entry[]) => void;
  isLoading?: boolean;
}

export const EntriesList = ({ entries, showCheckIn = true, onDelete, isLoading = false }: EntriesListProps) => {
  const { user } = useAuth();
  const { selectedEntry, setSelectedEntry, handleEntryClick, handleDelete } = useEntrySelection((deletedId: number) => {
    if (onDelete) {
      // Filter out the deleted entry from the current entries list
      const updatedEntries = entries.filter(entry => entry.id !== deletedId);
      onDelete(updatedEntries);
    }
  });
  
  const sortedEntries = [...entries]
    .filter(entry => showCheckIn || entry.entry_type !== 'check-in')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <>
      <Table>
        <EntriesTableHeader />
        <TableBody>
          {isLoading ? (
            <JournalEntriesSkeleton />
          ) : sortedEntries.length === 0 ? (
            <EmptyEntriesState />
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
        showDelete={!!user}
      />
    </>
  );
};