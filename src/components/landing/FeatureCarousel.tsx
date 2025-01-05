import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { FeatureCard, FeatureCardProps } from "./FeatureCard";

interface FeatureCarouselProps {
  features: FeatureCardProps[];
}

export const FeatureCarousel = ({ features }: FeatureCarouselProps) => (
  <Carousel 
    className="w-full" 
    opts={{ 
      align: "start", 
      loop: true,
      duration: 20
    }}
  >
    <CarouselContent>
      {features.map((feature, index) => (
        <CarouselItem key={index}>
          <FeatureCard {...feature} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <div className="flex justify-center gap-2 mt-3">
      {features.map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-2 h-2 rounded-full transition-all",
            "bg-duo-200 hover:bg-duo-300",
            "data-[active=true]:bg-duo-500"
          )}
          data-active={index === 0}
        />
      ))}
    </div>
  </Carousel>
);