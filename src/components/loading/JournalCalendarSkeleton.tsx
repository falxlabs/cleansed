import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const JournalCalendarSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <div className="p-4">
          {/* Calendar Grid Skeleton */}
          <div className="space-y-4">
            {/* Month/Year Header */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-1">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
            
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full mx-auto" />
              ))}
            </div>
            
            {/* Calendar Days */}
            {[...Array(5)].map((_, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {[...Array(7)].map((_, dayIndex) => (
                  <Skeleton 
                    key={dayIndex} 
                    className="h-8 w-8 rounded-full mx-auto"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="h-[354px]">
        <CardHeader className="p-4 pb-0">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-9 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};