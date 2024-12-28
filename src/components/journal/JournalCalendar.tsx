import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { CheckInDetails } from "./CheckInDetails";

interface JournalCalendarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  dailyCheckIn: any;
}

export const JournalCalendar = ({ date, onDateSelect, dailyCheckIn }: JournalCalendarProps) => {
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

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateSelect}
            className="rounded-md"
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