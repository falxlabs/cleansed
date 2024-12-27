import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mascot } from "@/components/dashboard/Mascot";
import { RequestResetForm } from "@/components/auth/RequestResetForm";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import { useToast } from "@/hooks/use-toast";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handlePasswordReset = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        // Check if we're in recovery mode
        if (window.location.hash && window.location.hash.includes('type=recovery')) {
          if (!session) {
            toast({
              title: "Error",
              description: "Invalid or expired reset link. Please request a new one.",
              variant: "destructive",
            });
            return;
          }
          setIsResetMode(true);
        }
      } catch (error) {
        console.error('Error checking reset mode:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    handlePasswordReset();
  }, [toast]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/signin")}
          className="hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Button>

        <Mascot
          message={isResetMode 
            ? "Enter your new password below."
            : emailSent 
              ? "Check your email for the reset link!"
              : "Enter your email and we'll send you instructions to reset your password."}
          className="mb-6"
        />

        <Card className="p-6">
          {isResetMode ? (
            <UpdatePasswordForm loading={loading} />
          ) : (
            <RequestResetForm 
              loading={loading}
              emailSent={emailSent}
              setEmailSent={setEmailSent}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;