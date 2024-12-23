import { ThumbsUp, ThumbsDown } from "lucide-react";

interface OutcomeStepProps {
  outcome: "resisted" | "gave-in" | undefined;
  onOutcomeChange: (outcome: "resisted" | "gave-in") => void;
}

export const OutcomeStep = ({ outcome, onOutcomeChange }: OutcomeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onOutcomeChange("resisted")}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
            outcome === "resisted"
              ? "border-duo-500 bg-duo-50"
              : "border-gray-200 hover:border-duo-300"
          }`}
        >
          <div className="rounded-full bg-duo-100 p-4 mb-3">
            <ThumbsUp className={`w-8 h-8 ${
              outcome === "resisted" ? "text-duo-600" : "text-duo-400"
            }`} />
          </div>
          <span className="font-semibold text-lg">I Resisted</span>
          <span className="text-sm text-muted-foreground mt-1">
            Stayed strong against temptation
          </span>
        </button>

        <button
          onClick={() => onOutcomeChange("gave-in")}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
            outcome === "gave-in"
              ? "border-destructive bg-destructive/10"
              : "border-gray-200 hover:border-destructive/50"
          }`}
        >
          <div className="rounded-full bg-destructive/20 p-4 mb-3">
            <ThumbsDown className={`w-8 h-8 ${
              outcome === "gave-in" ? "text-destructive" : "text-destructive/60"
            }`} />
          </div>
          <span className="font-semibold text-lg">I Gave In</span>
          <span className="text-sm text-muted-foreground mt-1">
            Struggled with the challenge
          </span>
        </button>
      </div>
    </div>
  );
};