import { useDataFetching } from "@/hooks/useDataFetching";
import { JournalEntry, TemptationEntry, CheckInEntry } from "@/types/database";
import { EntryDetailsDialog } from "./EntryDetailsDialog";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

interface EntriesListProps {
  entries?: JournalEntry[];
}

export function EntriesList({ entries: propEntries }: EntriesListProps = {}) {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const { user } = useAuth();
  
  const { data: fetchedEntries, loading } = useDataFetching<JournalEntry>('journal_entries', {
    realtime: true,
    where: { user_id: user?.id },
  });

  const entries = propEntries || fetchedEntries;

  if (loading && !propEntries) {
    return <div>Loading entries...</div>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          onClick={() => setSelectedEntry(entry)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <h3 className="text-lg font-semibold">{entry.entry_type}</h3>
          <p className="text-sm text-gray-500">
            {new Date(entry.created_at || '').toLocaleString()}
          </p>
        </div>
      ))}

      <EntryDetailsDialog
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </div>
  );
}