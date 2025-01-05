import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CalendarSkeleton = () => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Week days */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-lg" />
              ))}
            </div>
            
            {/* Calendar days */}
            {[...Array(5)].map((_, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {[...Array(7)].map((_, dayIndex) => (
                  <Skeleton 
                    key={dayIndex}
                    className="h-8 w-8 rounded-lg"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};