import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SUGGESTIONS = [
  "Take a quiet walk and reflect",
  "Pray for strength and guidance",
  "Practice deep breathing exercises",
  "Read a Bible verse about overcoming temptation",
  "Call a trusted friend or accountability partner",
  "Write down your thoughts in a journal",
];

export function SuggestionCarousel() {
  return (
    <div className="mt-6 sm:mt-8 space-y-4">
      <h4 className="text-base sm:text-lg font-medium text-center text-duo-700">
        Try these helpful activities while you wait:
      </h4>
      <Carousel className="w-full max-w-xs mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {SUGGESTIONS.map((suggestion, index) => (
            <CarouselItem key={index}>
              <div className="p-4 sm:p-6 rounded-xl bg-white/80 text-duo-800 text-sm sm:text-base text-center min-h-[80px] sm:min-h-[100px] flex items-center justify-center shadow-md">
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