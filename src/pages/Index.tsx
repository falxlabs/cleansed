import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/databaseUtils";
import type { Profile } from "@/types/database";
import { useAuth } from "@/providers/AuthProvider";

const Index = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user } = useAuth();

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

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 px-4">
      <div className="max-w-4xl mx-auto pt-8 pb-12">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-duo-500 mb-12 ml-4">
          Cleansed
        </h1>

        {/* Mascot Card */}
        <Card className="mb-12 p-8 bg-white/80 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-duo-100 flex items-center justify-center shrink-0">
              <span className="text-4xl md:text-6xl animate-bounce">🕊️</span>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Hi there, I'm Grace!
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Here to help you overcome temptation, day or night.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Progress Tracking</h3>
            <p className="text-gray-600">
              Track your journey with daily check-ins and celebrate victories.
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Instant Support</h3>
            <p className="text-gray-600">
              Get immediate help through guided exercises and strategies.
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90">
            <div className="text-4xl mb-4">✝️</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Biblical Guidance</h3>
            <p className="text-gray-600">
              Receive Scripture-based support for your journey.
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