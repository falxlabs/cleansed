import { useEffect, Suspense } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContentSection } from "@/components/layout/ContentSection";
import { IndexSkeleton } from "@/components/loading/IndexSkeleton";
import { FeatureCarousel } from "@/components/landing/FeatureCarousel";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { LandingActions } from "@/components/landing/LandingActions";
import { WelcomeCard } from "@/components/landing/WelcomeCard";
import type { FeatureCardProps } from "@/components/landing/FeatureCard";

const features: FeatureCardProps[] = [
  {
    emoji: "💪",
    title: "Break Free",
    description: "Overcome challenges with actionable insights"
  },
  {
    emoji: "🎯",
    title: "Stay Focused",
    description: "Develop discipline through tailored reminders"
  },
  {
    emoji: "✝️",
    title: "Grow Your Faith",
    description: "Find peace and clarity with uplifting bible verses"
  }
];

const IndexContent = () => {
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
          <WelcomeCard />
        </ContentSection>

        <ContentSection>
          <div className="block sm:hidden">
            <FeatureCarousel features={features} />
          </div>
          <FeatureGrid features={features} />
        </ContentSection>

        <ContentSection className="pb-6">
          <LandingActions />
        </ContentSection>
      </PageContainer>
    </div>
  );
};

const Index = () => {
  return (
    <Suspense fallback={<IndexSkeleton />}>
      <IndexContent />
    </Suspense>
  );
};

export default Index;