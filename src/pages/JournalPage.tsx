import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const handleEntryClick = (entry: typeof mockEntries[0]) => {
    setSelectedEntry(entry);
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedEntries.map((entry) => (
                  <TableRow 
                    key={entry.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleEntryClick(entry)}
                  >
                    <TableCell className="font-medium">
                      {format(entry.date, "MMM d")}
                    </TableCell>
                    <TableCell>{entry.type}</TableCell>
                    <TableCell className="text-center">
                      {entry.resisted ? (
                        <Check className="inline h-5 w-5 text-green-500" />
                      ) : (
                        <X className="inline h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {selectedEntries.length === 0 && (
                  <TableRow>
                    <TableCell 
                      colSpan={3} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      No entries found for this date
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEntry?.type} - {format(selectedEntry?.date || new Date(), "MMMM d, yyyy")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Outcome</p>
              <p>{selectedEntry?.resisted ? "Resisted" : "Gave in"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Level</p>
              <p>{selectedEntry?.level}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Trigger</p>
              <p>{selectedEntry?.trigger}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notes</p>
              <p>{selectedEntry?.notes}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
