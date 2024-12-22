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
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

// Temporary mock data - replace with actual data from your backend
const mockEntries = [
  {
    id: 1,
    date: new Date(2024, 3, 15),
    type: "Anger",
    level: "Medium",
    trigger: "Work stress",
    notes: "Felt overwhelmed with deadlines",
  },
  {
    id: 2,
    date: new Date(2024, 3, 14),
    type: "Pride",
    level: "High",
    trigger: "Social media",
    notes: "Comparing achievements with others",
  },
  // Add more mock entries as needed
];

export default function TemptationTimelinePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEntries, setSelectedEntries] = useState(mockEntries);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      // Filter entries for the selected date
      // In a real app, this would likely be a backend query
      const filtered = mockEntries.filter(
        (entry) => format(entry.date, "yyyy-MM-dd") === format(newDate, "yyyy-MM-dd")
      );
      setSelectedEntries(filtered);
    } else {
      setSelectedEntries(mockEntries);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Temptation Timeline</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md"
          />
        </Card>

        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(entry.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.level}</TableCell>
                  <TableCell>{entry.trigger}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {entry.notes}
                  </TableCell>
                </TableRow>
              ))}
              {selectedEntries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No entries found for this date
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}