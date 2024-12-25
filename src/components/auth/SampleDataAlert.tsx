import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const SampleDataAlert = () => {
  return (
    <Alert className="bg-duo-50 border-duo-200 py-2">
      <Info className="h-4 w-4 text-duo-500" />
      <AlertDescription className="text-duo-700 text-sm">
        You're viewing sample data
      </AlertDescription>
    </Alert>
  );
};