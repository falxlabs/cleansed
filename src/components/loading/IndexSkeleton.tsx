import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const IndexSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="h-8 w-32">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Mascot Card Skeleton */}
      <Card className="p-3 sm:p-4 md:p-6 bg-white/80">
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6">
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl" />
          <div className="flex-1 space-y-2 sm:space-y-3 w-full">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>

      {/* Features Grid Skeleton */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-3 sm:p-4">
            <div className="space-y-3 flex flex-col items-center">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ))}
      </div>

      {/* Mobile Features Skeleton */}
      <div className="block sm:hidden">
        <Card className="p-3">
          <div className="space-y-3 flex flex-col items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </Card>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
};