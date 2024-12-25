import { TableCell, TableRow } from "@/components/ui/table";

export const EmptyEntriesState = () => (
  <TableRow>
    <TableCell
      colSpan={5}
      className="text-center py-8 text-muted-foreground"
    >
      No entries found
    </TableCell>
  </TableRow>
);