import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 px-4">
      <div className="max-w-4xl mx-auto pt-16 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Cleansed
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Walk in Freedom with Christ
          </p>
        </div>

        {/* Mascot Card */}
        <Card className="mb-12 p-8 bg-white/80 backdrop-blur">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-2xl bg-duo-100 animate-bounce flex items-center justify-center shrink-0">
              <span className="text-6xl">🕊️</span>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Hi, I'm Grace
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm here whenever you need me, day or night, to support your journey to freedom.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300 bg-white/90">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-4">Long-term Progress</h3>
            <p className="text-gray-600">
              Track your journey with daily check-ins and reflections, celebrating every step forward in your path to freedom.
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300 bg-white/90">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-bold mb-4">Practical Support</h3>
            <p className="text-gray-600">
              Get immediate help with temptation through guided exercises, biblical wisdom, and practical strategies.
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300 bg-white/90">
            <div className="text-4xl mb-4">✝️</div>
            <h3 className="text-xl font-bold mb-4">AI Scripture Guide</h3>
            <p className="text-gray-600">
              Receive personalized biblical guidance based on your journey, powered by AI trained on Scripture.
            </p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="duo-button text-xl px-8 py-4"
            onClick={() => navigate("/signup")}
          >
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            className="text-xl px-8 py-4"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;