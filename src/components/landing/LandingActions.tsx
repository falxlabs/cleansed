import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/dashboard/ActionButton";

export const LandingActions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto">
        <ActionButton
          label="Start Your Journey"
          onClick={() => navigate("/onboarding")}
          className="flex-1"
        />
        <ActionButton
          variant="outline"
          label="Sign In"
          onClick={() => navigate("/signin")}
          className="flex-1"
        />
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="text-gray-500 hover:text-gray-700 hover:underline transition-colors text-sm"
      >
        Skip for now
      </button>
    </div>
  );
};