import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const SampleDataAlert = () => {
  return (
    <Alert className="bg-duo-50 border-duo-200">
      <Info className="h-4 w-4 text-duo-500" />
      <AlertDescription className="text-duo-700">
        You're viewing sample data. Sign in to track your own progress.
      </AlertDescription>
    </Alert>
  );
};