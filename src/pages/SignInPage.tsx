import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    // For now, just navigate to dashboard on submit
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-4xl font-bold text-center mb-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full duo-button">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;