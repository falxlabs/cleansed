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
      <h2 className="text-2xl font-bold text-center mb-6">Your Decision</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleOutcomeSelect("resisted")}
          className={`
            flex flex-col items-center justify-center p-6 h-[200px] sm:h-[300px]
            rounded-2xl transition-all duration-500
            hover:-translate-y-2 shadow-lg hover:shadow-xl
            ${
              outcome === "resisted"
                ? "bg-duo-500 text-white"
                : "bg-white hover:bg-duo-50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl mb-4">👍</span>
            <span className="font-bold text-lg sm:text-xl">Resisted</span>
          </div>
        </button>

        <button
          onClick={() => handleOutcomeSelect("gave-in")}
          className={`
            flex flex-col items-center justify-center p-6 h-[200px] sm:h-[300px]
            rounded-2xl transition-all duration-500
            hover:-translate-y-2 shadow-lg hover:shadow-xl
            ${
              outcome === "gave-in"
                ? "bg-destructive text-white"
                : "bg-white hover:bg-red-50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl mb-4">👎</span>
            <span className="font-bold text-lg sm:text-xl">Stumbled</span>
          </div>
        </button>
      </div>
    </div>
  );
};