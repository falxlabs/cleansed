import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shouldShowCheckIn } from "@/utils/checkInUtils";
import { useLocation } from "react-router-dom";
import { create } from "zustand";

interface MascotStore {
  message: string;
  setMessage: (message: string) => void;
  resetMessage: () => void;
}

export const useMascotStore = create<MascotStore>((set) => ({
  message: "",
  setMessage: (message) => set({ message }),
  resetMessage: () => set({ message: "" })
}));

interface MascotProps {
  message?: string;
  className?: string;
  onCheckIn?: () => void;
  showCheckInButton?: boolean;
}

const getUserFirstName = () => {
  return localStorage.getItem("userFirstName") || "";
};

const getMotivationalMessage = () => {
  const messages = [
    "Keep going strong! Every small victory counts.",
    "You're doing great! Stay focused on your journey.",
    "Remember, you're stronger than any temptation.",
    "Your commitment to growth is inspiring!",
    "One day at a time - you've got this!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export function Mascot({ message: propMessage, className, onCheckIn, showCheckInButton = false }: MascotProps) {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const shouldShow = shouldShowCheckIn();
  const firstName = getUserFirstName();
  const personalizedGreeting = firstName ? `Hey ${firstName}! ` : "Hey! ";
  
  const { message: storeMessage } = useMascotStore();
  
  let displayMessage = propMessage;
  
  if (storeMessage) {
    displayMessage = storeMessage;
  } else if (isDashboard && shouldShow) {
    displayMessage = `${personalizedGreeting}It's time for your daily check-in. This helps us track your progress and support you better!`;
  } else if (!displayMessage) {
    displayMessage = getMotivationalMessage();
  }

  return (
    <Card className={cn(
      "p-6 relative overflow-hidden",
      "bg-white rounded-3xl border-2 border-gray-200 shadow-lg",
      "animate-fade-in",
      className
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-duo-100 animate-bounce flex items-center justify-center">
            <span className="text-3xl">🕊️</span>
          </div>
          <p className="text-lg font-bold leading-relaxed text-gray-800">{displayMessage}</p>
        </div>
        {showCheckInButton && isDashboard && shouldShow && onCheckIn && (
          <Button
            onClick={onCheckIn}
            className="bg-duo-100 text-duo-800 hover:bg-duo-200 w-full"
          >
            Daily Check-in
          </Button>
        )}
      </div>
    </Card>
  );
}