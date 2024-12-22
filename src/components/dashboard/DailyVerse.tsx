import { Card } from "@/components/ui/card";
import { Book } from "lucide-react";

interface DailyVerseProps {
  verse: string;
  reference: string;
}

export function DailyVerse({ verse, reference }: DailyVerseProps) {
  return (
    <Card className="p-6 bg-sage-50">
      <div className="flex items-start gap-4">
        <Book className="w-6 h-6 text-sage-600 shrink-0 mt-1" />
        <div className="space-y-2">
          <p className="text-lg italic">{verse}</p>
          <p className="text-sm font-medium text-sage-600">{reference}</p>
        </div>
      </div>
    </Card>
  );
}