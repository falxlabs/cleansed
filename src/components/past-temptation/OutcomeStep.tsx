import { useNavigate } from "react-router-dom";

interface OutcomeStepProps {
  outcome: "resisted" | "gave-in" | undefined;
  onOutcomeChange: (outcome: "resisted" | "gave-in") => void;
}

export const OutcomeStep = ({ outcome, onOutcomeChange }: OutcomeStepProps) => {
  const navigate = useNavigate();

  const handleOutcomeSelect = (selectedOutcome: "resisted" | "gave-in") => {
    onOutcomeChange(selectedOutcome);
    navigate('/reflection');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleOutcomeSelect("resisted")}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
            outcome === "resisted"
              ? "border-duo-500 bg-duo-50"
              : "border-gray-200 hover:border-duo-300"
          }`}
        >
          <div className="rounded-full bg-duo-100 p-4 mb-3">
            <span className="text-4xl">👍</span>
          </div>
          <span className="font-semibold text-lg">I Resisted</span>
          <span className="text-sm text-muted-foreground mt-1">
            Stayed strong against temptation
          </span>
        </button>

        <button
          onClick={() => handleOutcomeSelect("gave-in")}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
            outcome === "gave-in"
              ? "border-destructive bg-destructive/10"
              : "border-gray-200 hover:border-destructive/50"
          }`}
        >
          <div className="rounded-full bg-destructive/20 p-4 mb-3">
            <span className="text-4xl">👎</span>
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