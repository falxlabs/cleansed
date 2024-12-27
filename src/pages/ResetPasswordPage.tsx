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
    const checkResetToken = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const hash = window.location.hash;
        
        // Check if we're in password reset mode
        if (hash && hash.includes('type=recovery')) {
          setIsResetMode(true);
        } else if (session?.user) {
          // If user is already logged in and not in reset mode, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error('Error checking reset token:', error);
        toast({
          title: "Error",
          description: "Failed to initialize password reset. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkResetToken();
  }, [navigate, toast]);

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