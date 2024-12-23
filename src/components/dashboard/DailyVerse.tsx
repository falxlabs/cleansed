import { Book } from "lucide-react";

interface DailyVerseProps {
  verse: string;
  reference: string;
}

export function DailyVerse({ verse, reference }: DailyVerseProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-duo-100 p-3 rounded-2xl">
        <Book className="w-6 h-6 text-duo-600" />
      </div>
      <div className="space-y-3">
        <p className="text-lg leading-relaxed">{verse}</p>
        <p className="text-sm font-bold text-duo-600">{reference}</p>
      </div>
    </div>
  );
}