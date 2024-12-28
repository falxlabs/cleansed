import { Book } from "lucide-react";

interface DailyVerseProps {
  verse: string;
  reference: string;
}

export function DailyVerse({ verse, reference }: DailyVerseProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
      <div className="bg-duo-100 p-2.5 sm:p-3 rounded-xl shrink-0">
        <Book className="w-5 h-5 sm:w-6 sm:h-6 text-duo-600" />
      </div>
      <div className="space-y-2 sm:space-y-3">
        <p className="text-sm sm:text-base leading-relaxed">{verse}</p>
        <p className="text-xs sm:text-sm font-bold text-duo-600">{reference}</p>
      </div>
    </div>
  );
}