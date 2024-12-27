import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RequestResetFormProps {
  loading: boolean;
  emailSent: boolean;
  setEmailSent: (sent: boolean) => void;
}

export const RequestResetForm = ({ loading, emailSent, setEmailSent }: RequestResetFormProps) => {
  const [email, setEmail] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const { toast } = useToast();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastRequestTime < 60000) { // 60 seconds cooldown
      toast({
        title: "Please wait",
        description: "Please wait a minute before requesting another reset link.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setLastRequestTime(now);
      setEmailSent(true);
      toast({
        title: "Success",
        description: "If an account exists with this email, you will receive reset instructions shortly.",
      });
    } catch (error: any) {
      console.error('Reset request error:', error);
      // Don't reveal if the email exists or not for security
      toast({
        title: "Success",
        description: "If an account exists with this email, you will receive reset instructions shortly.",
      });
    }
  };

  return (
    <form onSubmit={handleResetRequest} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={emailSent || loading}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full duo-button"
        disabled={loading || emailSent}
      >
        {loading ? "Sending..." : emailSent ? "Email Sent" : "Send Reset Instructions"}
      </Button>
    </form>
  );
};