import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { useLandingNavigation } from "@/hooks/use-landing-navigation";

const Index = () => {
  const { goToOnboarding, goToSignIn, goToDashboard } = useLandingNavigation();

  const features = [
    {
      icon: "📈",
      title: "Track Progress",
      description: "Daily check-ins to celebrate victories"
    },
    {
      icon: "💪",
      title: "Get Support",
      description: "Guided exercises and strategies"
    },
    {
      icon: "✝️",
      title: "Faith Journey",
      description: "Scripture-based guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full pt-8 sm:pt-12 lg:pt-16 flex-1 flex flex-col">
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-duo-500 mb-12 sm:mb-16 lg:mb-20">
            Cleansed
          </h1>

          {/* Features - Grid on desktop, Carousel on mobile */}
          <div className="mb-12 sm:mb-16 lg:mb-20 flex-1">
            <div className="block sm:hidden">
              <Carousel 
                className="w-full relative pb-12" 
                opts={{ 
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {features.map((feature, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <FeatureCard {...feature} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
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
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-6 pb-12 sm:pb-16 lg:pb-20">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
              <Button
                className="duo-button text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 flex-1 shadow-lg hover:shadow-xl"
                onClick={goToOnboarding}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 flex-1 bg-white hover:bg-gray-50 border-2"
                onClick={goToSignIn}
              >
                Sign In
              </Button>
            </div>
            <button
              onClick={goToDashboard}
              className="text-gray-500 hover:text-gray-700 hover:underline transition-colors text-base"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;