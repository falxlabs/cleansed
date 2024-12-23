import { format } from "date-fns";
import { getMoodEmoji, getMoodText, getTemptationLevelText } from "./EntryDetailsDialog";

interface DailyCheckInDetailsProps {
  entry: {
    date: Date;
    trigger: string;
    level: string;
    notes: string;
    mood?: number;
    affirmation?: string;
    personalNotes?: string;
  };
}

export const DailyCheckInDetails = ({ entry }: DailyCheckInDetailsProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="bg-primary/5 p-4 sm:p-6 rounded-xl border border-primary/10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-semibold text-primary">Current Mood</p>
          <span className="text-3xl" title={getMoodText(entry.mood)}>
            {getMoodEmoji(entry.mood)}
          </span>
        </div>
        <div className="h-2.5 bg-primary/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${entry.mood || 50}%` }}
          />
        </div>
        <p className="text-sm text-primary/80 mt-2 text-right font-medium">
          {getMoodText(entry.mood)}
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Primary Challenge</p>
          <p className="capitalize">{entry.trigger}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Challenge Intensity</p>
          <p>{getTemptationLevelText(entry.level)}</p>
        </div>
      </div>

      {entry.personalNotes && (
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Personal Notes</p>
          <p className="text-gray-700">{entry.personalNotes}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-sm font-semibold text-primary mb-2">Mood Description</p>
        <p className="text-gray-700">{entry.notes || "No description provided"}</p>
      </div>

      {entry.affirmation && (
        <div className="bg-primary/5 p-4 sm:p-6 rounded-xl border border-primary/10">
          <p className="text-sm font-semibold text-primary mb-2">Daily Affirmation</p>
          <p className="text-lg font-medium italic text-gray-700">"{entry.affirmation}"</p>
        </div>
      )}
    </div>
  );
};