import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Mascot } from "@/components/dashboard/Mascot";
import { SignInForm } from "@/components/auth/SignInForm";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Mascot
          message="Welcome back! Enter your credentials to continue your journey."
          className="mb-6"
        />

        <Card className="p-6">
          <SignInForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue without account
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="w-full"
          >
            Skip for now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;