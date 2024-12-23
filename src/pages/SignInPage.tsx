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
      // First check if the user exists
      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers({
        filters: {
          email: email
        }
      });

      if (userError) throw userError;

      // If no user found with this email
      if (!users || users.length === 0) {
        toast({
          title: "Account not found",
          description: "This email is not registered. Please sign up first.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // If user exists, proceed with sign in
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signInError) throw signInError;

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
          onClick={() => navigate(-1)}
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
              className="w-full duo-button"
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