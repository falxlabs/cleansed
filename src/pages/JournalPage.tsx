import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntriesTable } from "@/components/journal/EntriesTable";
import { EntryDetailsDialog } from "@/components/journal/EntryDetailsDialog";
import { DailyCheckInSummary } from "@/components/journal/DailyCheckInSummary";
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
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [entries, setEntries] = useState(loadJournalEntries());
  const isMobile = useIsMobile();

  const filteredEntries = showCalendar && date
    ? entries.filter(entry => 
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    : entries;

  const dailyCheckIn = showCalendar && date
    ? entries.find(entry => 
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && 
        entry.type.toLowerCase().includes("check-in")
      )
    : null;

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleDeleteEntry = (id: number) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="container max-w-7xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 pb-20 md:pb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <Card>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md"
              />
            </Card>
            
            {date && (
              <Card className="lg:h-[354px]">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">Daily Check-in</CardTitle>
                  <CardDescription>
                    {format(date, "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <DailyCheckInSummary entry={dailyCheckIn} date={date} />
                </CardContent>
              </Card>
            )}
          </div>
        )}

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
              <EntriesTable 
                entries={filteredEntries} 
                onEntryClick={setSelectedEntry} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <EntryDetailsDialog 
        entry={selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
}