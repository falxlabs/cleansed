import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContentSection } from "@/components/layout/ContentSection";

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureCard = ({ emoji, title, description }: FeatureCardProps) => (
  <Card className="p-4 sm:p-6 text-center bg-white/90">
    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{emoji}</div>
    <h3 className="text-base sm:text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
  </Card>
);

const features: FeatureCardProps[] = [
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

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 overflow-y-auto">
      <PageContainer>
        {/* Logo */}
        <ContentSection>
          <h1 className="text-2xl sm:text-3xl font-bold text-duo-500">
            Cleansed
          </h1>
        </ContentSection>

        {/* Mascot Card */}
        <ContentSection>
          <Card className="p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur shadow-xl">
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
        </ContentSection>

        {/* Features */}
        <ContentSection>
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
              <div className="flex justify-center gap-2 mt-4">
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
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </ContentSection>

        {/* CTA Buttons */}
        <ContentSection className="pb-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
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
          </div>
        </ContentSection>
      </PageContainer>
    </div>
  );
};

export default Index;