import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const EntriesTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Date & Time</TableHead>
      <TableHead>Entry Type</TableHead>
      <TableHead className="text-center">Sin Type</TableHead>
      <TableHead className="text-center">Intensity</TableHead>
      <TableHead className="text-center">Outcome</TableHead>
    </TableRow>
  </TableHeader>
);