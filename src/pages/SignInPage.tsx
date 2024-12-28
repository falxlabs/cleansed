import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";

const SignInPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a magic link to sign in.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred while signing in.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Mascot
          message="Welcome back! Enter your email to continue your journey."
          className="mb-6"
        />

        <Card className="p-6">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-duo-500 text-white hover:bg-duo-600 active:bg-duo-700 
                       px-6 py-3 text-lg font-bold rounded-2xl shadow-md 
                       hover:shadow-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Sending..." : "Continue"}
            </Button>
          </form>

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
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full text-gray-500 hover:text-gray-800 
                     px-6 py-3 text-lg font-bold rounded-2xl
                     transition-colors duration-200"
          >
            Skip for now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;