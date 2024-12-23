import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto pt-8 pb-12 flex-1">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-duo-500 mb-12 ml-4">
          Cleansed
        </h1>

        {/* Mascot Card */}
        <Card className="mb-12 p-8 bg-white/80 backdrop-blur shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-duo-100 flex items-center justify-center shrink-0">
              <span className="text-4xl md:text-6xl animate-bounce">🕊️</span>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Hi there, I'm Grace.
              </h2>
              <p className="text-lg text-gray-700">
                Your companion in overcoming daily temptations through Christ.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center bg-white/90">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-lg font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600">Daily check-ins to celebrate victories</p>
          </Card>
          <Card className="p-6 text-center bg-white/90">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-lg font-bold mb-2">Get Support</h3>
            <p className="text-gray-600">Guided exercises and strategies</p>
          </Card>
          <Card className="p-6 text-center bg-white/90">
            <div className="text-4xl mb-4">✝️</div>
            <h3 className="text-lg font-bold mb-2">Faith Journey</h3>
            <p className="text-gray-600">Scripture-based guidance</p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto">
            <Button
              className="duo-button text-xl px-8 py-6 flex-1 hover:scale-105 transition-transform"
              onClick={() => navigate("/onboarding")}
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="text-xl px-8 py-6 border-2 flex-1 hover:scale-105 transition-transform"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 hover:text-gray-700 hover:underline transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;