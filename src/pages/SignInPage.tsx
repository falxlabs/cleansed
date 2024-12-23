import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-6 relative overflow-hidden">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-duo-100 animate-bounce flex items-center justify-center">
                <span className="text-3xl">🕊️</span>
              </div>
              <p className="text-lg font-bold leading-relaxed text-gray-800">
                Welcome back! Enter your email to continue your journey.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>
              <Button className="w-full duo-button">
                Continue
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;