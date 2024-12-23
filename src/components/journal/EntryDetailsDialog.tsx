import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EntryDetailsDialogProps {
  entry: {
    id: number;
    date: Date;
    type: string;
    resisted: boolean;
    level: string;
    trigger: string;
    notes: string;
    mood?: number;
    affirmation?: string;
    customNote?: string;
  } | null;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: number) => void;
}

const getTemptationLevelText = (value: string) => {
  const levelValue = parseInt(value);
  if (levelValue <= 25) return "Low - I can resist easily";
  if (levelValue <= 50) return "Medium - It's challenging but manageable";
  if (levelValue <= 75) return "High - I struggle significantly";
  return "Severe - Almost impossible to resist";
};

const getMoodEmoji = (mood?: number) => {
  if (!mood) return "😐";
  if (mood <= 20) return "😢";
  if (mood <= 40) return "😕";
  if (mood <= 60) return "😐";
  if (mood <= 80) return "🙂";
  return "😊";
};

const getMoodText = (mood?: number) => {
  if (!mood) return "Neutral";
  if (mood <= 20) return "Very Low";
  if (mood <= 40) return "Low";
  if (mood <= 60) return "Neutral";
  if (mood <= 80) return "Good";
  return "Excellent";
};

export const EntryDetailsDialog = ({ entry, onOpenChange, onDelete }: EntryDetailsDialogProps) => {
  const { toast } = useToast();

  if (!entry) return null;

  const isCheckIn = entry.type.toLowerCase().includes("check-in");
  const formattedDate = format(entry.date, "EEEE, MMMM d, yyyy");
  const formattedTime = format(entry.date, "h:mm a");

  const handleDelete = () => {
    if (entry && onDelete) {
      onDelete(entry.id);
      onOpenChange(false);
      toast({
        title: "Entry deleted",
        description: "The entry has been successfully deleted.",
      });
    }
  };

  return (
    <Dialog open={!!entry} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
            {isCheckIn ? "Daily Check-in" : "Temptation Entry"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground font-medium">
            {formattedDate} at {formattedTime}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {isCheckIn ? (
            <>
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
                  <p className="text-sm font-semibold text-primary mb-2">Intensity Level</p>
                  <p>{getTemptationLevelText(entry.level)}</p>
                </div>
              </div>

              {entry.customNote && (
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-2">Challenge Description</p>
                  <p className="text-gray-700">{entry.customNote}</p>
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
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-2">Type of Temptation</p>
                  <p className="capitalize">{entry.type}</p>
                </div>
                
                <div className={`bg-white p-4 rounded-xl border shadow-sm ${
                  entry.resisted ? "bg-green-50" : "bg-red-50"
                }`}>
                  <p className="text-sm font-semibold text-primary mb-2">Outcome</p>
                  <p className={`font-medium ${
                    entry.resisted ? "text-green-600" : "text-red-600"
                  }`}>
                    {entry.resisted ? "✓ Successfully Resisted" : "✗ Gave in"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-sm font-semibold text-primary mb-2">Intensity Level</p>
                <p>{getTemptationLevelText(entry.level)}</p>
              </div>

              {entry.customNote && (
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-2">Temptation Description</p>
                  <p className="text-gray-700">{entry.customNote}</p>
                </div>
              )}

              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-sm font-semibold text-primary mb-2">Trigger</p>
                <p className="text-gray-700">{entry.trigger || "No trigger specified"}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-sm font-semibold text-primary mb-2">
                  {entry.resisted ? "What helped me resist" : "Additional Notes"}
                </p>
                <p className="text-gray-700">{entry.notes || "No notes provided"}</p>
              </div>
            </>
          )}
          
          <div className="flex justify-end pt-2 border-t">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2 hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};