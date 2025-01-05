import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const JournalSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Calendar Section */}
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

      {/* Entries List Section */}
      <Card className="lg:col-span-2">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 pb-2 border-b">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            
            {/* Table Rows */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 py-2">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-full" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};