import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./carousel-context"

export const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { count: number }
>(({ className, count, ...props }, ref) => {
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
      className={cn("flex justify-center gap-2 mt-3", className)}
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
})
CarouselDots.displayName = "CarouselDots"