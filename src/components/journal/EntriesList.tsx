import { Table, TableBody } from "@/components/ui/table";
import { EntryDetailsDialog } from "./EntryDetailsDialog";
import { EntryRow } from "./EntryRow";
import { Entry } from "./types";
import { useAuth } from "@/providers/AuthProvider";
import { EmptyEntriesState } from "./EmptyEntriesState";
import { EntriesTableHeader } from "./EntriesTableHeader";
import { useEntrySelection } from "./useEntrySelection";

interface EntriesListProps {
  entries: Entry[];
  showCheckIn?: boolean;
  onDelete?: (entries: Entry[]) => void;
}

export const EntriesList = ({ entries, showCheckIn = true, onDelete }: EntriesListProps) => {
  const { user } = useAuth();
  const { selectedEntry, setSelectedEntry, handleEntryClick, handleDelete } = useEntrySelection(onDelete);
  
  const sortedEntries = [...entries]
    .filter(entry => showCheckIn || entry.entry_type !== 'check-in')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <>
      <Table>
        <EntriesTableHeader />
        <TableBody>
          {sortedEntries.length === 0 ? (
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