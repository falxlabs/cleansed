import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      emoji: "📈",
      title: "Track Progress",
      description: "Daily check-ins to celebrate victories"
    },
    {
      emoji: "💪",
      title: "Get Support",
      description: "Guided exercises and strategies"
    },
    {
      emoji: "✝️",
      title: "Faith Journey",
      description: "Scripture-based guidance"
    }
  ];

  const FeatureCard = ({ emoji, title, description }: { emoji: string; title: string; description: string }) => (
    <Card className="p-4 sm:p-6 text-center bg-white/90">
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{emoji}</div>
      <h3 className="text-base sm:text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 flex flex-col">
      <div className="flex-1 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto pt-4 sm:pt-6 md:pt-8">
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-duo-500 mb-6 sm:mb-8 md:mb-12 ml-2 sm:ml-4">
            Cleansed
          </h1>

          {/* Mascot Card */}
          <Card className="mb-6 sm:mb-8 md:mb-12 p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl bg-duo-100 flex items-center justify-center shrink-0">
                <span className="text-3xl sm:text-4xl md:text-6xl animate-bounce">🕊️</span>
              </div>
              <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Hi there, I'm Grace.
                </h2>
                <p className="text-base sm:text-lg text-gray-700">
                  Your companion in overcoming daily temptations through Christ.
                </p>
              </div>
            </div>
          </Card>

          {/* Features - Grid on desktop, Carousel on mobile */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="block sm:hidden">
              <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {features.map((feature, index) => (
                    <CarouselItem key={index}>
                      <FeatureCard {...feature} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 mb-8 sm:mb-12 px-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-lg mx-auto">
              <Button
                className="duo-button text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 flex-1 hover:scale-105 transition-transform"
                onClick={() => navigate("/onboarding")}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 border-2 flex-1 hover:scale-105 transition-transform"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-500 hover:text-gray-700 hover:underline transition-colors text-sm sm:text-base"
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