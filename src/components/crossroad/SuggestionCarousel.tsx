import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
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
  const [api, setApi] = useState<ReturnType<typeof useCarousel>["api"]>();
  
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full">
      <Carousel 
        className="w-full max-w-xs mx-auto" 
        opts={{ 
          loop: true,
          align: "center",
          containScroll: "trimSnaps"
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {SUGGESTIONS.map((suggestion, index) => (
            <CarouselItem key={index}>
              <div className="text-center text-sm sm:text-base text-gray-600 font-medium py-2">
                {suggestion}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-2 h-6 w-6 text-gray-400 hover:text-duo-500 transition-colors" />
        <CarouselNext className="hidden sm:flex -right-2 h-6 w-6 text-gray-400 hover:text-duo-500 transition-colors" />
      </Carousel>
    </div>
  );
}