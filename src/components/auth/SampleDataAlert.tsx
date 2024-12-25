import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const SampleDataAlert = () => {
  return (
    <Alert className="bg-white border-gray-200 py-2">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-duo-500" />
        <AlertDescription className="text-gray-600 text-sm">
          You're viewing sample data
        </AlertDescription>
      </div>
    </Alert>
  );
};