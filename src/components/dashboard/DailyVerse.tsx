import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel/carousel-dots";
import { Card, CardContent } from "@/components/ui/card";

interface DailyVerseProps {
  verse: string;
  reference: string;
}

export function DailyVerse({ verse, reference }: DailyVerseProps) {
  const [api, setApi] = useState<any>(null);

  const verses = [
    { verse, reference },
    {
      verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      reference: "Joshua 1:9",
    },
    {
      verse: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13",
    },
  ];

  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      className="w-full relative"
      setApi={setApi}
    >
      <CarouselContent>
        {verses.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col gap-4 p-0">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.verse}
                </p>
                <p className="text-gray-500 font-medium">{item.reference}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-4 text-gray-600 hover:text-duo-500 transition-colors" />
      <CarouselNext className="hidden sm:flex -right-4 text-gray-600 hover:text-duo-500 transition-colors" />
      <CarouselDots count={verses.length} />
    </Carousel>
  );
}