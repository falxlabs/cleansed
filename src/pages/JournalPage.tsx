import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntriesTable } from "@/components/journal/EntriesTable";
import { EntryDetailsDialog } from "@/components/journal/EntryDetailsDialog";
import { CheckInDetails } from "@/components/journal/CheckInDetails";
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
      
      <div className="grid grid-cols-1 lg:grid-cols-[400px_400px] gap-4 sm:gap-8 justify-center">
        {showCalendar && (
          <>
            <Card className="h-[400px] flex flex-col">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Calendar</CardTitle>
                <CardDescription>
                  Select a date to view entries
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
            
            <Card className="h-[400px] flex flex-col">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Daily Check-in</CardTitle>
                <CardDescription>
                  {date ? format(date, "MMMM d, yyyy") : "No date selected"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                {dailyCheckIn ? (
                  <div className="space-y-4">
                    <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-primary">Mood</p>
                        <span className="text-2xl" title={dailyCheckIn.mood}>
                          {dailyCheckIn.mood >= 75 ? "😊" : 
                           dailyCheckIn.mood >= 50 ? "🙂" :
                           dailyCheckIn.mood >= 25 ? "😐" : "😔"}
                        </span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${dailyCheckIn.mood || 50}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border">
                        <p className="text-xs font-semibold text-primary mb-1">Challenge</p>
                        <p className="text-sm capitalize truncate">{dailyCheckIn.trigger}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border">
                        <p className="text-xs font-semibold text-primary mb-1">Intensity</p>
                        <p className="text-sm truncate">{dailyCheckIn.level}</p>
                      </div>
                    </div>

                    {dailyCheckIn.notes && (
                      <div className="bg-white p-3 rounded-xl border">
                        <p className="text-xs font-semibold text-primary mb-1">Notes</p>
                        <p className="text-sm line-clamp-3">{dailyCheckIn.notes}</p>
                      </div>
                    )}

                    {dailyCheckIn.affirmation && (
                      <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                        <p className="text-xs font-semibold text-primary mb-1">Affirmation</p>
                        <p className="text-sm italic line-clamp-2">"{dailyCheckIn.affirmation}"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">
                      No check-in data for this date
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Card className={`${showCalendar ? "lg:col-span-2" : ""} overflow-hidden`}>
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