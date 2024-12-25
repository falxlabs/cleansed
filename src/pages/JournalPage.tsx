import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntriesList } from "@/components/journal/EntriesList";
import { JournalCalendar } from "@/components/journal/JournalCalendar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
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
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    const loadEntries = async () => {
      try {
        // For unauthenticated users, show sample data without accessing storage
        if (!user) {
          const sampleEntries = [
            {
              id: 1,
              created_at: new Date().toISOString(),
              entry_type: 'check-in',
              checkin_entries: [{
                mood_score: 4,
                temptation_type: 'pride',
                intensity_level: 3
              }]
            },
            {
              id: 2,
              created_at: new Date(Date.now() - 86400000).toISOString(),
              entry_type: 'temptation',
              temptation_entries: [{
                temptation_type: 'greed',
                intensity_level: 2,
                resisted: true
              }]
            }
          ];
          setEntries(sampleEntries);
          setIsLoading(false);
          return;
        }

        // For authenticated users, fetch real data
        const { data, error } = await supabase
          .from('journal_entries')
          .select(`
            id,
            entry_type,
            created_at,
            temptation_entries (
              temptation_type,
              intensity_level,
              resisted
            ),
            checkin_entries (
              mood_score,
              temptation_type,
              intensity_level
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching entries:', error);
          setEntries([]);
        } else {
          setEntries(data || []);
        }
      } catch (error) {
        console.error('Error in loadEntries:', error);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, [user]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const filteredEntries = showCalendar && date
    ? entries.filter(entry => 
        format(new Date(entry.created_at), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    : entries;

  const dailyCheckIn = showCalendar && date
    ? entries.find(entry => 
        format(new Date(entry.created_at), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && 
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
                  <EntriesList entries={filteredEntries} />
                )}
              </div>
            </CardContent>
          </Card>

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