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
import { generateEncryptionKey, generateVerificationHash } from "@/utils/encryption";

const SignInPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Get the user's profile to check if they have a verification hash
      const { data: profile } = await supabase
        .from('profiles')
        .select('encryption_key_verification')
        .single();

      if (profile?.encryption_key_verification) {
        // Verify the encryption password
        const { key } = await generateEncryptionKey(password);
        const verificationHash = await generateVerificationHash(key);

        if (verificationHash !== profile.encryption_key_verification) {
          throw new Error("Incorrect password");
        }
      } else {
        // First time setup - generate and store verification hash
        const { key } = await generateEncryptionKey(password);
        const verificationHash = await generateVerificationHash(key);

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ encryption_key_verification: verificationHash })
          .eq('id', (await supabase.auth.getUser()).data.user?.id);

        if (updateError) throw updateError;
      }

      // Store encryption key in memory (never in localStorage)
      window.sessionStorage.setItem('temp_encryption_key', password);

      toast({
        title: "Success",
        description: "You have been signed in successfully.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while signing in.",
        variant: "destructive",
      });

      // If password is wrong, clear it
      if (error.message === "Incorrect password") {
        setPassword("");
      }
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
          message="Welcome back! Enter your credentials to continue your journey."
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 font-normal text-sm"
                  onClick={() => navigate("/reset-password")}
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <p className="text-xs text-muted-foreground">
                Your password is used both for authentication and to encrypt your sensitive journal data.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full duo-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
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