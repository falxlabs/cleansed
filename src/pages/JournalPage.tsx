import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { EntryDetailsDialog } from "@/components/journal/EntryDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { JournalHeader } from "@/components/journal/JournalHeader";
import { CalendarSection } from "@/components/journal/CalendarSection";
import { EntriesSection } from "@/components/journal/EntriesSection";

export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchEntries();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
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

      if (error) {
        console.error('Error fetching entries:', error);
        return;
      }

      const formattedEntries = data?.map(entry => ({
        id: entry.id,
        date: new Date(entry.created_at),
        type: entry.entry_type,
        resisted: entry.temptation_entries?.[0]?.resisted ?? false,
        level: entry.temptation_entries?.[0]?.intensity_level?.toString() ?? "1",
        trigger: entry.entry_type === 'temptation' 
          ? entry.temptation_entries?.[0]?.trigger 
          : entry.checkin_entries?.[0]?.mood_description,
        notes: entry.temptation_entries?.[0]?.temptation_details ?? "",
        description: entry.temptation_entries?.[0]?.temptation_details,
        mood: entry.checkin_entries?.[0]?.mood_score,
        affirmation: entry.checkin_entries?.[0]?.affirmation_id,
      })) || [];

      setEntries(formattedEntries);
    } catch (error) {
      console.error('Error in fetchEntries:', error);
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

  if (!user) {
    return (
      <div className="container max-w-7xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 pb-20 md:pb-4">
        <div className="text-center py-8 text-muted-foreground">
          Please sign in to view your journal entries
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 pb-20 md:pb-4">
      <JournalHeader 
        showCalendar={showCalendar}
        onToggleCalendar={() => setShowCalendar(!showCalendar)}
      />
      
      <div className="grid grid-cols-1 gap-4 sm:gap-8">
        {showCalendar && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            <CalendarSection
              date={date}
              onDateSelect={handleDateSelect}
              dailyCheckIn={dailyCheckIn}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 sm:gap-8">
          <EntriesSection
            entries={filteredEntries}
            isLoading={isLoading}
            showCalendar={showCalendar}
            onEntryClick={setSelectedEntry}
          />

          {showCalendar && (
            <div className="hidden lg:grid grid-cols-1 gap-4">
              <CalendarSection
                date={date}
                onDateSelect={handleDateSelect}
                dailyCheckIn={dailyCheckIn}
              />
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