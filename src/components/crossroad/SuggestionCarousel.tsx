import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SUGGESTIONS = [
  "Take a walk",
  "Say a prayer",
  "Take deep breaths",
  "Read scripture",
  "Call a friend",
  "Write it down",
];

export function SuggestionCarousel() {
  return (
    <div className="space-y-4">
      <h4 className="text-base sm:text-lg font-medium text-center text-black">
        These activities will help you overcome this moment:
      </h4>
      <Carousel className="w-full max-w-xs mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {SUGGESTIONS.map((suggestion, index) => (
            <CarouselItem key={index}>
              <div className="p-4 sm:p-6 rounded-xl bg-white/80 text-black text-sm sm:text-base text-center min-h-[80px] sm:min-h-[100px] flex items-center justify-center shadow-md">
                {suggestion}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 sm:left-0" aria-label="View previous suggestion" />
        <CarouselNext className="-right-2 sm:right-0" aria-label="View next suggestion" />
      </Carousel>
    </div>
  );
}