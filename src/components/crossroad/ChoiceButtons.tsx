import { Sun, Skull } from "lucide-react";
import { ActionButton } from "@/components/dashboard/ActionButton";

interface ChoiceButtonsProps {
  onSubmitToGod: () => void;
  onFallToSin: () => void;
  isTimerComplete: boolean;
}

export function ChoiceButtons({ 
  onSubmitToGod, 
  onFallToSin, 
  isTimerComplete 
}: ChoiceButtonsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ActionButton
        icon={Sun}
        label="Choose God"
        onClick={onSubmitToGod}
        className="bg-duo-500 hover:bg-duo-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 py-4 sm:py-6 text-lg sm:text-xl font-bold h-[200px] sm:h-[300px] hover:-translate-y-2 border-4 border-duo-700 px-4 sm:px-8 [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-12 sm:[&_svg]:h-12"
      />
      
      <ActionButton
        icon={Skull}
        label="Give In"
        onClick={onFallToSin}
        variant="destructive"
        className="h-[200px] sm:h-[300px] hover:-translate-y-2 transition-all duration-500 border-4 border-red-700 text-lg sm:text-xl px-4 sm:px-8 [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-12 sm:[&_svg]:h-12"
        disabled={!isTimerComplete}
      />
    </div>
  );
}