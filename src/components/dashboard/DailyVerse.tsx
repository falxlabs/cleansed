import { Card } from "@/components/ui/card";
import { Book } from "lucide-react";

interface DailyVerseProps {
  verse: string;
  reference: string;
}

export function DailyVerse({ verse, reference }: DailyVerseProps) {
  return (
    <Card className="p-6 bg-white rounded-3xl border-2 border-gray-200 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="bg-duo-100 p-3 rounded-2xl">
          <Book className="w-6 h-6 text-duo-600" />
        </div>
        <div className="space-y-3">
          <p className="text-lg leading-relaxed">{verse}</p>
          <p className="text-sm font-bold text-duo-600">{reference}</p>
        </div>
      </div>
    </Card>
  );
}