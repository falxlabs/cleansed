import { ActionButton } from "@/components/dashboard/ActionButton";

interface ChoiceButtonsProps {
  onSubmitToGod: () => void;
  onFallToSin: () => void;
  isTimerComplete: boolean;
  unlockTime: number;
}

export function ChoiceButtons({ 
  onSubmitToGod, 
  onFallToSin, 
  isTimerComplete,
  unlockTime
}: ChoiceButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ActionButton
        emoji="🙏"
        label="Choose God"
        onClick={onSubmitToGod}
        className="bg-duo-500 hover:bg-duo-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 py-4 sm:py-6 text-lg sm:text-xl font-bold h-[200px] sm:h-[300px] hover:-translate-y-2 border-4 border-duo-700 px-4 sm:px-8 
          [&_span.emoji]:text-4xl [&_span.emoji]:mb-4
          [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:gap-4"
      />
      
      <ActionButton
        emoji="💀"
        label="Give In"
        onClick={onFallToSin}
        variant="destructive"
        className="h-[200px] sm:h-[300px] hover:-translate-y-2 transition-all duration-500 border-4 border-red-700 text-lg sm:text-xl px-4 sm:px-8 
          [&_span.emoji]:text-4xl [&_span.emoji]:mb-4
          [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:gap-4"
        disabled={unlockTime > 0}
      />
    </div>
  );
}