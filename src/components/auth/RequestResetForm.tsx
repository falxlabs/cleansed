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
    if (now - lastRequestTime < 30000) { // 30 seconds cooldown
      toast({
        title: "Please wait",
        description: "For security purposes, please wait 30 seconds before trying again.",
        variant: "destructive",
      });
      return;
    }

    setLastRequestTime(now);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        if (error.message.includes('rate_limit') || error.message.includes('security purposes')) {
          toast({
            title: "Too many attempts",
            description: "Please wait 30 seconds before trying again.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setEmailSent(true);
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email.",
        variant: "destructive",
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