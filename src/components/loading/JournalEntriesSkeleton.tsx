import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const JournalEntriesSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <TableRow key={i} className="hover:bg-gray-50">
          <TableCell>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell className="text-center">
            <Skeleton className="h-8 w-8 rounded-full mx-auto" />
          </TableCell>
          <TableCell className="text-center">
            <Skeleton className="h-5 w-16 mx-auto" />
          </TableCell>
          <TableCell className="text-center">
            <div className="flex items-center justify-center">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};