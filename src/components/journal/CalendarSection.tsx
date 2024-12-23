import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyCheckInSummary } from "./DailyCheckInSummary";
import { format } from "date-fns";

interface CalendarSectionProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  dailyCheckIn: any;
}

export const CalendarSection = ({ date, onDateSelect, dailyCheckIn }: CalendarSectionProps) => {
  return (
    <>
      <Card>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelect}
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
    </>
  );
};