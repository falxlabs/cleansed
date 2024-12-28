import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { CheckInDetails } from "./CheckInDetails";
import { Entry } from "./types";

interface JournalCalendarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  dailyCheckIn: any;
  entries?: Entry[];
}

export const JournalCalendar = ({ date, onDateSelect, dailyCheckIn, entries = [] }: JournalCalendarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const checkInData = dailyCheckIn ? {
    date: new Date(dailyCheckIn.created_at),
    trigger: dailyCheckIn.checkin_entries[0]?.temptation_type,
    level: dailyCheckIn.checkin_entries[0]?.intensity_level?.toString(),
    notes: '',
    mood: dailyCheckIn.checkin_entries[0]?.mood_score,
    affirmation: dailyCheckIn.checkin_entries[0]?.affirmation_content,
    description: dailyCheckIn.checkin_entries[0]?.mood_description,
  } : null;

  // Create a Set of dates that have entries (in YYYY-MM-DD format)
  const datesWithEntries = new Set(
    entries.filter(entry => entry.created_at).map(entry => 
      new Date(entry.created_at).toISOString().split('T')[0]
    )
  );

  // Custom modifier for the calendar
  const modifiers = {
    hasEntries: (day: Date) => {
      const dateStr = day.toISOString().split('T')[0];
      return datesWithEntries.has(dateStr) && (!date || dateStr !== date.toISOString().split('T')[0]);
    }
  };

  // Custom modifier styles
  const modifiersStyles = {
    hasEntries: {
      backgroundColor: "#F2FCE2",
      color: "#000000" // Ensure consistent black text color
    },
    today: {
      backgroundColor: "#E5E7EB",
      color: "#000000", // Ensure consistent black text color
      fontWeight: "bold"
    },
    selected: {
      backgroundColor: "#38B94A",
      color: "white",
      fontWeight: "bold",
      borderRadius: "9999px" // Make it perfectly circular
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateSelect}
            className="rounded-md [&_.rdp-day]:text-black [&_.rdp-day_button]:rounded-full"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            disabled={{ after: new Date() }}
          />
        </div>
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
            {!checkInData ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <span className="text-4xl">📝</span>
                  <p className="text-muted-foreground mb-4">
                    {date.toDateString() === new Date().toDateString() 
                      ? "Fill out your daily check-in now"
                      : "Daily check-in was missed on " + format(date, "MMMM d, yyyy")
                    }
                  </p>
                  {date.toDateString() === new Date().toDateString() && (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => navigate('/daily-checkin')}
                        className="w-full"
                        disabled={!user}
                      >
                        Start Check-in
                      </Button>
                      {!user && (
                        <p className="text-sm text-muted-foreground">
                          Please sign in to start your daily check-in
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <CheckInDetails entry={checkInData} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};