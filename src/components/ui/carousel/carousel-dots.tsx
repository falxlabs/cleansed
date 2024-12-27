import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./carousel-context"

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, count, ...props }, ref) => {
    const carousel = useCarousel()
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    React.useEffect(() => {
      if (!carousel.api) return

      carousel.api.on("select", () => {
        setSelectedIndex(carousel.api.selectedScrollSnap())
      })

      // Cleanup listener on unmount
      return () => {
        carousel.api?.off("select", () => {
          setSelectedIndex(carousel.api!.selectedScrollSnap())
        })
      }
    }, [carousel.api])

    return (
      <div
        ref={ref}
        className={cn("flex justify-center gap-2 mt-4", className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              "bg-duo-200 hover:bg-duo-300",
              selectedIndex === index && "bg-duo-500"
            )}
            onClick={() => carousel.api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  }
)
CarouselDots.displayName = "CarouselDots"