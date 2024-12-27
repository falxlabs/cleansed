import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { generateEncryptionKey, generateVerificationHash } from "@/utils/encryption";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      // Generate new encryption key verification
      const { key } = await generateEncryptionKey(newPassword);
      const verificationHash = await generateVerificationHash(key);

      // Update the verification hash
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ encryption_key_verification: verificationHash })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      });

      // Store encryption key in memory
      window.sessionStorage.setItem('temp_encryption_key', newPassword);
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password.",
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
          onClick={() => navigate("/sign-in")}
          className="hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Button>

        <Mascot
          message="Set your new password to regain access to your account."
          className="mb-6"
        />

        <Card className="p-6">
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
              <Key className="mr-2 h-4 w-4" />
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;