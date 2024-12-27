import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./carousel-context"

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, count, ...props }, ref) => {
    const { api } = useCarousel()
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    React.useEffect(() => {
      if (!api) return

      const onSelect = () => {
        setSelectedIndex(api.selectedScrollSnap())
      }

      api.on("select", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }, [api])

    return (
      <div
        ref={ref}
        className={cn("absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4", className)}
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
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  }
)
CarouselDots.displayName = "CarouselDots"