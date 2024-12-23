import { format } from "date-fns";
import { Check, X, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Drawer } from "vaul";
import { toast } from "@/hooks/use-toast";

interface Entry {
  id: number;
  date: Date;
  type: string;
  resisted: boolean;
  level: string;
  trigger: string;
  notes: string;
  mood?: number;
  affirmation?: string;
}

interface EntryRowProps {
  entry: Entry;
  onClick: (entry: Entry) => void;
  onDelete?: (id: number) => void;
}

const getTimeEmoji = (hour: number) => {
  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "☀️";
  if (hour >= 17 && hour < 21) return "🌆";
  return "🌙";
};

const getSeverityEmoji = (level: string) => {
  const levelLower = level.toLowerCase();
  if (levelLower.includes("low")) return "🟢";
  if (levelLower.includes("medium")) return "🟡";
  if (levelLower.includes("high")) return "🟠";
  return "🔴";
};

export const EntryRow = ({ entry, onClick, onDelete }: EntryRowProps) => {
  const isCheckIn = entry.type === "Daily check-in";

  const handleDelete = () => {
    if (onDelete) {
      onDelete(entry.id);
      toast({
        title: "Entry deleted",
        description: "The journal entry has been removed.",
      });
    }
  };
  
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <TableRow
          className="cursor-pointer hover:bg-muted/50 touch-pan-y"
        >
          <TableCell>
            <div className="flex flex-col">
              <span className="font-medium">
                {format(entry.date, "EEE, MMM d, yyyy")}
              </span>
              <span className="text-sm text-muted-foreground">
                {getTimeEmoji(entry.date.getHours())} {format(entry.date, "h:mm a")}
              </span>
            </div>
          </TableCell>
          <TableCell>
            <span className="font-medium">
              {isCheckIn ? "Check-in" : "Temptation"}
            </span>
          </TableCell>
          <TableCell className="text-center">
            <span className="text-xl">
              {getSeverityEmoji(entry.level)}
            </span>
          </TableCell>
          <TableCell className="text-center">
            {!isCheckIn && (
              entry.resisted ? (
                <Check className="inline h-5 w-5 text-green-500" />
              ) : (
                <X className="inline h-5 w-5 text-red-500" />
              )
            )}
          </TableCell>
        </TableRow>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content className="bg-destructive/10 fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[10px]">
          <div className="p-4 flex flex-col items-center gap-4">
            <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="flex items-center gap-2 text-destructive hover:text-destructive/80"
            >
              <Trash2 className="h-5 w-5" />
              Delete Entry
            </button>
          </div>
        </Drawer.Content>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      </Drawer.Portal>
    </Drawer.Root>
  );
};