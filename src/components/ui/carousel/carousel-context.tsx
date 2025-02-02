import * as React from "react"
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react"

export interface CarouselOptions {
  align?: "start" | "center" | "end"
  axis?: "x" | "y"
  loop?: boolean
  dragFree?: boolean
  duration?: number
  jump?: boolean
  skipSnaps?: boolean
  autoplay?: boolean
  delay?: number
}

export type CarouselApi = UseEmblaCarouselType[1]

export interface CarouselProps {
  opts?: CarouselOptions
  plugins?: any
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi | undefined
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

export const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}