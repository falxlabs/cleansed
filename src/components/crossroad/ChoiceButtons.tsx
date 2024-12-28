import { ActionButton } from "@/components/dashboard/ActionButton";

interface ChoiceButtonsProps {
  onSubmitToGod: () => void;
  onFallToSin: () => void;
}

export function ChoiceButtons({ onSubmitToGod, onFallToSin }: ChoiceButtonsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Your Decision</h2>
      <div className="grid grid-cols-2 gap-4">
        <ActionButton
          emoji="🙏"
          label="Choose God"
          onClick={onSubmitToGod}
          className="bg-white hover:bg-duo-50 text-black shadow-lg hover:shadow-xl 
                  transition-all duration-500 py-4 sm:py-6 text-lg sm:text-xl font-bold 
                  h-[200px] sm:h-[300px] hover:-translate-y-2 px-4 sm:px-8 
                  [&_span.emoji]:text-4xl [&_span.emoji]:mb-4
                  "
        />

        <ActionButton
          emoji="😔"
          label="I Stumbled"
          onClick={onFallToSin}
          variant="destructive"
          className="bg-white hover:bg-red-50 text-black h-[200px] sm:h-[300px] hover:-translate-y-2 
                  transition-all duration-500 text-lg sm:text-xl px-4 sm:px-8 
                  shadow-lg hover:shadow-xl
                  [&_span.emoji]:text-4xl [&_span.emoji]:mb-4
                  "
        />
      </div>
    </div>
  );
}