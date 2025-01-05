import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EntriesList } from "./EntriesList";
import { Entry } from "./types";
import { JournalSkeleton } from "../loading/JournalSkeleton";

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
      onEntriesUpdate(updatedEntries);
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
          <EntriesList 
            entries={filteredEntries} 
            showCheckIn={!showCalendar}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}