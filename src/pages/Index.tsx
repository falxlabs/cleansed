import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel/carousel-dots";
import { cn } from "@/lib/utils";

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

  const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <Card className="p-8 text-center bg-white shadow-lg border-0">
      <div className="text-4xl mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-2xl bg-duo-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </Card>
  );

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
                <CarouselDots count={features.length} />
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
                onClick={() => navigate("/onboarding")}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="text-xl px-8 py-6 flex-1 bg-white hover:bg-gray-50 border-2"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
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