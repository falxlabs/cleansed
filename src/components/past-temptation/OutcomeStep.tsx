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
          className={`
            flex flex-col items-center justify-center p-6 h-[200px] sm:h-[300px]
            rounded-2xl border-4 transition-all duration-500
            hover:-translate-y-2 shadow-lg hover:shadow-xl
            ${
              outcome === "resisted"
                ? "border-duo-700 bg-duo-500 text-white"
                : "border-duo-500 hover:border-duo-600 bg-white hover:bg-duo-50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl mb-4">👍</span>
            <span className="font-bold text-lg sm:text-xl">I Resisted</span>
            <span className="text-sm text-center">
              Stayed strong against temptation
            </span>
          </div>
        </button>

        <button
          onClick={() => handleOutcomeSelect("gave-in")}
          className={`
            flex flex-col items-center justify-center p-6 h-[200px] sm:h-[300px]
            rounded-2xl border-4 transition-all duration-500
            hover:-translate-y-2 shadow-lg hover:shadow-xl
            ${
              outcome === "gave-in"
                ? "border-red-700 bg-destructive text-white"
                : "border-red-500 hover:border-red-600 bg-white hover:bg-red-50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl mb-4">👎</span>
            <span className="font-bold text-lg sm:text-xl">I Gave In</span>
            <span className="text-sm text-center">
              Struggled with the challenge
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};