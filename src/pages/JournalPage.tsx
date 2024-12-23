import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntriesTable } from "@/components/journal/EntriesTable";
import { EntryDetailsDialog } from "@/components/journal/EntryDetailsDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadJournalEntries } from "@/utils/journalEntries";

export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEntries, setSelectedEntries] = useState(loadJournalEntries());
  const [selectedEntry, setSelectedEntry] = useState<typeof selectedEntries[0] | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const isMobile = useIsMobile();

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      const entries = loadJournalEntries();
      const filtered = entries.filter(
        (entry) => format(entry.date, "yyyy-MM-dd") === format(newDate, "yyyy-MM-dd")
      );
      setSelectedEntries(filtered);
    } else {
      setSelectedEntries(loadJournalEntries());
    }
  };

  return (
    <div className={`container max-w-7xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 ${isMobile ? "pb-20" : ""}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Journal</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center gap-2"
        >
          {showCalendar ? (
            <>Hide Calendar <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Show Calendar <ChevronDown className="h-4 w-4" /></>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-8">
        {showCalendar && (
          <Card className="p-2 sm:p-4 h-fit">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md"
            />
          </Card>
        )}

        <Card className={showCalendar ? "" : "lg:col-span-2"}>
          <CardHeader className="p-4">
            <CardTitle>Entries</CardTitle>
            <CardDescription>
              Click on an entry to view more details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <EntriesTable 
              entries={selectedEntries} 
              onEntryClick={setSelectedEntry} 
            />
          </CardContent>
        </Card>
      </div>

      <EntryDetailsDialog 
        entry={selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
      />
    </div>
  );
}
