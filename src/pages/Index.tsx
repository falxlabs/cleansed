import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContentSection } from "@/components/layout/ContentSection";
import { ActionButton } from "@/components/dashboard/ActionButton";

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureCard = ({ emoji, title, description }: FeatureCardProps) => (
  <Card className="p-3 sm:p-4 text-center bg-white/90">
    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{emoji}</div>
    <h3 className="text-base font-bold mb-1.5">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
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
    <div className="bg-gradient-to-b from-white to-duo-50 min-h-screen">
      <PageContainer>
        <ContentSection>
          <h1 className="text-xl sm:text-2xl font-bold text-duo-500">
            Cleansed
          </h1>
        </ContentSection>

        <ContentSection>
          <Card className="p-3 sm:p-4 md:p-6 bg-white/80 backdrop-blur shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-duo-100 flex items-center justify-center shrink-0">
                <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce">🕊️</span>
              </div>
              <div className="flex-1 space-y-2 sm:space-y-3 text-center md:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Hi there, I'm Grace.
                </h2>
                <p className="text-sm sm:text-base text-gray-700">
                  Your companion in overcoming daily temptations through Christ.
                </p>
              </div>
            </div>
          </Card>
        </ContentSection>

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
              <div className="flex justify-center gap-2 mt-3">
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
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </ContentSection>

        <ContentSection className="pb-6">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto">
              <ActionButton
                label="Start Your Journey"
                onClick={() => navigate("/onboarding")}
                className="flex-1"
              />
              <ActionButton
                variant="outline"
                label="Sign In"
                onClick={() => navigate("/signin")}
                className="flex-1"
              />
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-500 hover:text-gray-700 hover:underline transition-colors text-sm"
            >
              Skip for now
            </button>
          </div>
        </ContentSection>
      </PageContainer>
    </div>
  );
};

export default Index;
