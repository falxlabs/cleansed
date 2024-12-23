import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteEntryButtonProps {
  onClick: () => void;
}

export const DeleteEntryButton = ({ onClick }: DeleteEntryButtonProps) => {
  return (
    <div className="flex justify-end pt-2 border-t">
      <Button
        variant="destructive"
        size="sm"
        onClick={onClick}
        className="flex items-center gap-2 hover:bg-red-600"
      >
        <Trash2 className="h-4 w-4" />
        Delete Entry
      </Button>
    </div>
  );
};