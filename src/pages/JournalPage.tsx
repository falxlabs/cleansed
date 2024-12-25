import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ListFilter, CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntriesList } from "@/components/journal/EntriesList";
import { DailyCheckInSummary } from "@/components/journal/DailyCheckInSummary";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log("JournalPage mounted, fetching entries...");
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    console.log("Starting fetchEntries...");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
      if (!user) {
        console.log("No user found, returning early");
        setIsLoading(false);
        return;
      }

      console.log("Fetching entries for user:", user.id);
      const { data, error } = await supabase
        .from('journal_entries')
        .select(`
          *,
          temptation_entries(*),
          checkin_entries(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      console.log("Raw data from Supabase:", data);

      if (!data) {
        console.log("No data returned from Supabase");
        setEntries([]);
        setIsLoading(false);
        return;
      }

      const formattedEntries = data.map(entry => {
        const isTemptation = entry.entry_type === 'temptation';
        const entryDetails = isTemptation ? entry.temptation_entries?.[0] : entry.checkin_entries?.[0];
        
        return {
          id: entry.id,
          date: new Date(entry.created_at),
          type: entry.entry_type,
          resisted: isTemptation ? entryDetails?.resisted ?? false : true,
          level: entryDetails?.intensity_level?.toString() ?? "0",
          trigger: entryDetails?.trigger ?? "",
          notes: isTemptation ? entryDetails?.temptation_details ?? "" : "",
          temptation_type: isTemptation ? entryDetails?.temptation_type : undefined,
          mood: entry.checkin_entries?.[0]?.mood_score,
        };
      });

      console.log("Final formatted entries:", formattedEntries);
      setEntries(formattedEntries);
    } catch (error) {
      console.error('Error in fetchEntries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    console.log("Date selected:", newDate);
    setDate(newDate);
  };

  const filteredEntries = showCalendar && date
    ? entries.filter(entry => 
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    : entries;

  const dailyCheckIn = showCalendar && date
    ? entries.find(entry => 
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && 
        entry.type === 'checkin'
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
            <>
              <ListFilter className="h-4 w-4" />
              View All Entries
            </>
          ) : (
            <>
              <CalendarDays className="h-4 w-4" />
              Filter by Date
            </>
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
          <EntriesList 
            entries={filteredEntries}
            isLoading={isLoading}
            showCalendar={showCalendar}
          />

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
    </div>
  );
}