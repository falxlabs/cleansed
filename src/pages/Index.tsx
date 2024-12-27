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
    <div className="bg-gradient-to-b from-white to-duo-50 min-h-screen">
      <div className="px-4 sm:px-6 md:px-8 min-h-screen flex flex-col">
        <div className="max-w-5xl mx-auto pt-8 sm:pt-12 md:pt-16 flex-1 flex flex-col">
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-duo-500 mb-12 sm:mb-16 md:mb-20 ml-2 sm:ml-4">
            Cleansed
          </h1>

          {/* Features - Grid on desktop, Carousel on mobile */}
          <div className="mb-12 sm:mb-16 md:mb-20 flex-1">
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
                    <CarouselItem key={index}>
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
            <div className="hidden sm:grid sm:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-6 pb-12">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
              <Button
                className="duo-button text-xl px-8 py-6 flex-1 shadow-lg hover:shadow-xl"
                onClick={goToOnboarding}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="text-xl px-8 py-6 flex-1 bg-white hover:bg-gray-50 border-2"
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