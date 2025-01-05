import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const JournalSkeleton = () => {
  return (
    <Card>
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-48 mt-2" />
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};