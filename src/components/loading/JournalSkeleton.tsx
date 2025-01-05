import { CalendarSkeleton } from "./CalendarSkeleton";
import { EntriesListSkeleton } from "./EntriesListSkeleton";

export const JournalSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <CalendarSkeleton />
      <EntriesListSkeleton />
    </div>
  );
};