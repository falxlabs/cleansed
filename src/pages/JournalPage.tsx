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

  // Filter entries based on calendar visibility and selected date
  const filteredEntries = showCalendar && date
    ? entries.filter(entry => 
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    : entries;

  // Find the check-in entry for the selected date
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
            <Card className="p-2 sm:p-4 h-[400px]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md"
              />
            </Card>
            
            {dailyCheckIn ? (
              <Card className="h-[400px]">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Daily Check-in</CardTitle>
                  <CardDescription>
                    {format(dailyCheckIn.date, "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl" title={getMoodText(dailyCheckIn.mood)}>
                        {getMoodEmoji(dailyCheckIn.mood)}
                      </span>
                      <p className="text-sm font-medium text-primary">
                        {getMoodText(dailyCheckIn.mood)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1">Challenge</p>
                        <p className="text-sm capitalize">{dailyCheckIn.trigger}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1">Intensity</p>
                        <p className="text-sm">{getTemptationLevelText(dailyCheckIn.level)}</p>
                      </div>
                    </div>

                    {dailyCheckIn.description && (
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1">Notes</p>
                        <p className="text-sm line-clamp-2">{dailyCheckIn.description}</p>
                      </div>
                    )}

                    {dailyCheckIn.affirmation && (
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1">Affirmation</p>
                        <p className="text-sm italic line-clamp-2">"{dailyCheckIn.affirmation}"</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">No check-in data for this date</p>
              </Card>
            )}
          </>
        )}
      </div>

      <Card className={`${showCalendar ? "" : "lg:col-span-2"} overflow-hidden`}>
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

      <EntryDetailsDialog 
        entry={selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
}

function getMoodText(mood?: number): string {
  if (!mood) return "Neutral";
  if (mood <= 20) return "Very Negative";
  if (mood <= 40) return "Negative";
  if (mood <= 60) return "Neutral";
  if (mood <= 80) return "Positive";
  return "Very Positive";
}

function getMoodEmoji(mood?: number): string {
  if (!mood) return "😐";
  if (mood <= 20) return "😢";
  if (mood <= 40) return "😕";
  if (mood <= 60) return "😐";
  if (mood <= 80) return "🙂";
  return "😊";
}

function getTemptationLevelText(level: string): string {
  const value = parseInt(level);
  if (value <= 25) return "Low";
  if (value <= 50) return "Medium";
  if (value <= 75) return "High";
  return "Severe";
}