import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntriesTable } from "@/components/journal/EntriesTable";
import { EntryDetailsDialog } from "@/components/journal/EntryDetailsDialog";
import { DailyCheckInSummary } from "@/components/journal/DailyCheckInSummary";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('journal_entries')
        .select(`
          *,
          temptation_entries(*),
          checkin_entries(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedEntries = data.map(entry => ({
        id: entry.id,
        date: new Date(entry.created_at),
        type: entry.entry_type,
        resisted: entry.temptation_entries?.[0]?.resisted ?? true,
        level: entry.temptation_entries?.[0]?.intensity_level?.toString() ?? "medium",
        trigger: entry.temptation_entries?.[0]?.trigger ?? entry.checkin_entries?.[0]?.mood_description ?? "",
        notes: entry.temptation_entries?.[0]?.temptation_details ?? "",
        mood: entry.checkin_entries?.[0]?.mood_score,
      }));

      setEntries(formattedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleEntryDelete = (deletedEntryId: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== deletedEntryId));
    setSelectedEntry(null);
  };

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
      
      <div className="grid grid-cols-1 gap-4 sm:gap-8">
        {showCalendar && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            <Card>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md"
              />
            </Card>
            
            {date && (
              <Card className="h-[354px]">
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 sm:gap-8">
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
                  <EntriesTable 
                    entries={filteredEntries} 
                    onEntryClick={setSelectedEntry} 
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {showCalendar && (
            <div className="hidden lg:grid grid-cols-1 gap-4">
              <Card>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md"
                />
              </Card>
              
              {date && (
                <Card className="h-[354px]">
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
        </div>
      </div>

      <EntryDetailsDialog 
        entry={selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
        onDelete={handleEntryDelete}
      />
    </div>
  );
}