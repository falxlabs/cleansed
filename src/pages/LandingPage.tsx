import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="max-w-lg w-full p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-duo-100 animate-bounce flex items-center justify-center">
            <span className="text-5xl">🕊️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Grace Bearer</h1>
          <p className="text-lg text-gray-600">
            Your companion in overcoming temptation. Together, we'll build strength,
            track progress, and grow in faith through daily reflection and support.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/onboarding')} 
            className="w-full text-lg py-6"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/signin')} 
            className="w-full text-lg py-6"
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
}