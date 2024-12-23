import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/databaseUtils";
import type { Profile } from "@/types/database";

const Index = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 px-4">
      <div className="max-w-4xl mx-auto pt-20 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in">
            Cleansed
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Walk in Freedom with Christ
          </p>
        </div>

        {/* Mascot Card */}
        <Card className="mb-16 p-8 bg-white/80 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-duo-100 flex items-center justify-center shrink-0">
              <span className="text-4xl md:text-6xl animate-bounce">🕊️</span>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {profile?.first_name ? `Hi, ${profile.first_name}` : "Hi there"}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                I'm here whenever you need me, day or night, to support your journey to freedom.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90">
            <div className="text-4xl mb-6">📈</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Long-term Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Track your journey with daily check-ins and reflections, celebrating every step forward in your path to freedom.
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90">
            <div className="text-4xl mb-6">💪</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Practical Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Get immediate help with temptation through guided exercises, biblical wisdom, and practical strategies.
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90">
            <div className="text-4xl mb-6">✝️</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Coming Soon: AI Scripture Guide</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive personalized biblical guidance based on your journey, powered by AI trained on Scripture.
            </p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              className="duo-button text-xl px-8 py-6 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate("/onboarding")}
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="text-xl px-8 py-6 border-2 hover:bg-duo-50 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;