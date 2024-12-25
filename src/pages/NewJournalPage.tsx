import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { JournalCalendar } from "@/components/journal/JournalCalendar";
import { useAuth } from "@/providers/AuthProvider";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEntriesList } from "@/components/journal/JournalEntriesList";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { Entry } from "@/components/journal/types";

export default function NewJournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const { data: entries = [], isLoading } = useJournalEntries(showCalendar ? date : undefined);
  const [localEntries, setLocalEntries] = useState<Entry[]>([]);

  // Update local entries when the query data changes
  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleEntriesUpdate = (updatedEntries: Entry[]) => {
    setLocalEntries(updatedEntries);
  };

  const dailyCheckIn = showCalendar && date && localEntries
    ? localEntries.find(entry => 
        new Date(entry.created_at).toDateString() === date.toDateString() && 
        entry.entry_type === "check-in"
      )
    : null;

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
            <>View All Entries <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Filter by Date <ChevronDown className="h-4 w-4" /></>
          )}
        </Button>
      </div>
      
      {!user && (
        <Card>
          <CardHeader>
            <CardTitle>Sample Data</CardTitle>
            <CardDescription>
              You're viewing sample data. Sign in to track your own journal entries.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:gap-8">
        {showCalendar && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            <JournalCalendar
              date={date}
              onDateSelect={handleDateSelect}
              dailyCheckIn={dailyCheckIn}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 sm:gap-8">
          <JournalEntriesList 
            showCalendar={showCalendar}
            isLoading={isLoading}
            entries={localEntries}
            date={date}
            onEntriesUpdate={handleEntriesUpdate}
          />

          {showCalendar && (
            <div className="hidden lg:block">
              <JournalCalendar
                date={date}
                onDateSelect={handleDateSelect}
                dailyCheckIn={dailyCheckIn}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}