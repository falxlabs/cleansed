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
      <h4 className="text-base sm:text-lg font-medium text-center text-gray-700">
        These activities will help you overcome this moment:
      </h4>
      <Carousel 
        className="w-full max-w-xs mx-auto" 
        opts={{ 
          loop: true,
          align: "center",
          containScroll: "trimSnaps"
        }}
      >
        <CarouselContent>
          {SUGGESTIONS.map((suggestion, index) => (
            <CarouselItem key={index}>
              <div className="p-6 rounded-xl bg-white shadow-md border-2 border-gray-100 text-gray-800 text-center min-h-[100px] flex items-center justify-center font-medium hover:border-duo-300 transition-colors duration-300">
                {suggestion}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4 border-2 hover:bg-duo-50 hover:border-duo-300" />
        <CarouselNext className="hidden sm:flex -right-4 border-2 hover:bg-duo-50 hover:border-duo-300" />
      </Carousel>
    </div>
  );
}