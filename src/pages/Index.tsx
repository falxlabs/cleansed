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
            Walk in Freedom with Christ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your daily companion in the journey of faith and victory over temptation
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
                Let's walk together in faith, focusing on progress, not perfection.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-bold mb-3">Progress Over Perfection</h3>
            <p className="text-gray-600">Daily check-ins that celebrate growth and encourage consistency</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-xl font-bold mb-3">Journal & Reflect</h3>
            <p className="text-gray-600">Track your journey and learn from experiences with guided reflection</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-xl font-bold mb-3">Coming Soon: AI Guide</h3>
            <p className="text-gray-600">Bible-based AI assistance to support your spiritual journey</p>
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