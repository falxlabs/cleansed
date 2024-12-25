import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EntriesList } from "./EntriesList";

interface JournalEntriesListProps {
  showCalendar: boolean;
  isLoading: boolean;
  entries: any[];
  date?: Date;
}

export const JournalEntriesList = ({ 
  showCalendar, 
  isLoading, 
  entries,
  date 
}: JournalEntriesListProps) => {
  const filteredEntries = showCalendar && date
    ? entries.filter(entry => 
        new Date(entry.created_at).toDateString() === date.toDateString()
      )
    : entries;

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
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};