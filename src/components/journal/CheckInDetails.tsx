import { format } from "date-fns";
import { getMoodEmoji, getMoodText } from "./EntryDetailsDialog";
import { getSinEmoji } from "@/utils/sinEmoji";
import { getSeverityEmoji } from "@/utils/severityEmoji";

interface CheckInDetailsProps {
  entry: {
    date: Date;
    trigger: string;
    level: string;
    notes: string;
    mood?: number;
    affirmation?: string;
    description?: string;
  };
}

const getTemptationLevelText = (level: string) => {
  const levelNum = parseInt(level);
  if (levelNum <= 25) return "Low";
  if (levelNum <= 50) return "Medium";
  if (levelNum <= 75) return "High";
  return "Severe";
};

export const CheckInDetails = ({ entry }: CheckInDetailsProps) => {
  return (
    <div className="space-y-3">
      <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-primary">Mood</p>
          <span className="text-2xl" title={getMoodText(entry.mood)}>
            {getMoodEmoji(entry.mood)}
          </span>
        </div>
        <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${entry.mood}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl border">
          <p className="text-xs font-semibold text-primary mb-1">Challenge</p>
          <div className="flex items-center gap-2">
            <span className="text-xl">{getSinEmoji(entry.trigger)}</span>
            <p className="text-sm capitalize truncate">{entry.trigger}</p>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-xl border">
          <p className="text-xs font-semibold text-primary mb-1">Intensity</p>
          <div className="flex items-center gap-2">
            <span className="text-xl">{getSeverityEmoji(entry.level)}</span>
            <p className="text-sm truncate">{getTemptationLevelText(entry.level)}</p>
          </div>
        </div>
      </div>

      {entry.description && (
        <div className="bg-white p-3 rounded-xl border">
          <p className="text-xs font-semibold text-primary mb-1">Description</p>
          <p className="text-sm line-clamp-2">{entry.description}</p>
        </div>
      )}

      {entry.affirmation && (
        <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
          <p className="text-xs font-semibold text-primary mb-1">Affirmation</p>
          <p className="text-sm italic line-clamp-2">"{entry.affirmation}"</p>
        </div>
      )}
    </div>
  );
};