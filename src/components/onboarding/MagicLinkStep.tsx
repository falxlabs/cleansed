import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MagicLinkStepProps {
  email: string;
}

export function MagicLinkStep({ email }: MagicLinkStepProps) {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            redirect_to: `${window.location.origin}/dashboard`,
          }
        },
      });

      if (error) throw error;

      toast({
        title: "Email sent",
        description: "We've sent you a new magic link.",
      });
    } catch (error) {
      console.error("Error resending email:", error);
      toast({
        title: "Error",
        description: "Failed to resend the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Mail className="h-8 w-8 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold">Check your email</h2>
      
      <div className="space-y-2">
        <p className="text-muted-foreground">
          We've sent you a magic link to complete your signup.
        </p>
        <p className="text-muted-foreground">
          Click the link in your email to continue to the dashboard.
        </p>
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          onClick={handleResendEmail}
          disabled={isResending}
          className="w-full"
        >
          {isResending ? "Sending..." : "Resend email"}
        </Button>
      </div>
    </div>
  );
}