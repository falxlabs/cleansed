import { format, isToday } from "date-fns";
import { getMoodEmoji, getMoodText } from "./EntryDetailsDialog";
import { getSinEmoji } from "@/utils/sinEmoji";
import { getSeverityEmoji } from "@/utils/severityEmoji";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Separator } from "@/components/ui/separator";

interface DailyCheckInSummaryProps {
  entry?: {
    date: Date;
    trigger: string;
    level: string;
    notes: string;
    mood?: number;
    affirmation?: string;
    description?: string;
  };
  date: Date;
}

const getTemptationLevelText = (level: string) => {
  const levelNum = parseInt(level);
  if (levelNum <= 25) return "Low";
  if (levelNum <= 50) return "Medium";
  if (levelNum <= 75) return "High";
  return "Severe";
};

export const DailyCheckInSummary = ({ entry, date }: DailyCheckInSummaryProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!entry && isToday(date)) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <span className="text-4xl">📝</span>
          <p className="text-muted-foreground mb-4">
            Fill out your daily check-in now
          </p>
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
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <span className="text-4xl">😢</span>
          <p className="text-muted-foreground">
            Daily check-in was missed on {format(date, "MMMM d, yyyy")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Mood</h3>
          <span className="text-2xl" title={getMoodText(entry.mood)}>
            {getMoodEmoji(entry.mood)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {getMoodText(entry.mood)}
        </p>
        <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${entry.mood}%` }}
          />
        </div>
      </div>

      <Separator />
      
      <div>
        <h3 className="font-semibold mb-2">Challenge</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-xl border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Type</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getSinEmoji(entry.trigger)}</span>
              <p className="text-sm capitalize">{entry.trigger}</p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Intensity</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getSeverityEmoji(entry.level)}</span>
              <p className="text-sm">{getTemptationLevelText(entry.level)}</p>
            </div>
          </div>
        </div>
      </div>

      {entry.description && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{entry.description}</p>
          </div>
        </>
      )}

      {entry.affirmation && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Affirmation</h3>
            <p className="text-sm italic text-muted-foreground">"{entry.affirmation}"</p>
          </div>
        </>
      )}
    </div>
  );
};