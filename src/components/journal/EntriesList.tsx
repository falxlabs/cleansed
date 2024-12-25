import { useDataFetching } from "@/hooks/useDataFetching";
import { JournalEntry } from "@/types/database";
import { EntryDetailsDialog } from "./EntryDetailsDialog";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export function EntriesList() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const { user } = useAuth();
  
  const { data: entries, loading } = useDataFetching<JournalEntry>('journal_entries', {
    realtime: true, // We want real-time updates for journal entries
    where: { user_id: user?.id },
  });

  console.log('Entries received in EntriesList:', entries);

  if (loading) {
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
          <p className="text-sm text-gray-500">{entry.created_at}</p>
        </div>
      ))}

      <EntryDetailsDialog
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </div>
  );
}
