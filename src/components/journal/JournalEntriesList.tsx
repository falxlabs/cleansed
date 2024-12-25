import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EntriesList } from "./EntriesList";
import { Entry } from "./types";

interface JournalEntriesListProps {
  showCalendar: boolean;
  isLoading: boolean;
  entries: Entry[];
  date?: Date;
  onEntriesUpdate?: (entries: Entry[]) => void;
}

export function JournalEntriesList({ 
  showCalendar, 
  isLoading, 
  entries,
  date,
  onEntriesUpdate
}: JournalEntriesListProps) {
  const filteredEntries = showCalendar && date
    ? entries.filter(entry => 
        new Date(entry.created_at).toDateString() === date.toDateString()
      )
    : entries;

  const handleDelete = (updatedEntries: Entry[]) => {
    if (onEntriesUpdate) {
      // Update with all entries, not just filtered ones
      const newEntries = entries.filter(entry => 
        !filteredEntries.find(deleted => deleted.id === entry.id)
      );
      onEntriesUpdate(newEntries);
    }
  };

  return (
    <Card className={`${showCalendar ? "" : "lg:col-span-2"}`}>
      <CardHeader className="p-4">
        <CardTitle>Entries</CardTitle>
        <CardDescription>
          {showCalendar 
            ? "Showing entries for selected date" 
            : "Showing all entries"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading entries...
            </div>
          ) : (
            <EntriesList 
              entries={filteredEntries} 
              showCheckIn={!showCalendar}
              onDelete={handleDelete}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}