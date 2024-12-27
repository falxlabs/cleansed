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

      api.on("select", () => {
        setSelectedIndex(api.selectedScrollSnap())
      })
    }, [api])

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
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    )
  }
)
CarouselDots.displayName = "CarouselDots"