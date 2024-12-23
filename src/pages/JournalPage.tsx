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

// Temporary mock data - replace with actual data from your backend
const mockEntries = [
  {
    id: 1,
    date: new Date(2024, 3, 15),
    type: "Anger",
    resisted: true,
    level: "Medium",
    trigger: "Work stress",
    notes: "Felt overwhelmed with deadlines",
  },
  {
    id: 2,
    date: new Date(2024, 3, 14),
    type: "Pride",
    resisted: false,
    level: "High",
    trigger: "Social media",
    notes: "Comparing achievements with others",
  },
];

export default function TemptationTimelinePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEntries, setSelectedEntries] = useState(mockEntries);
  const [selectedEntry, setSelectedEntry] = useState<typeof mockEntries[0] | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const isMobile = useIsMobile();

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      const filtered = mockEntries.filter(
        (entry) => format(entry.date, "yyyy-MM-dd") === format(newDate, "yyyy-MM-dd")
      );
      setSelectedEntries(filtered);
    } else {
      setSelectedEntries(mockEntries);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className={`container max-w-7xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 ${isMobile ? "pb-20" : ""}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Temptation Timeline</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleCalendar}
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