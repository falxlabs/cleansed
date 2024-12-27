import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mascot } from "@/components/dashboard/Mascot";
import { RequestResetForm } from "@/components/auth/RequestResetForm";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Sign out first to ensure we're starting fresh
      await supabase.auth.signOut();
      
      // Check if we're in password reset mode by looking for the token in the URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');
      
      if (type === 'recovery' && accessToken) {
        // Set the session with the recovery token
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: '',
        });
        
        if (!error) {
          setIsResetMode(true);
        }
      }
    };
    
    init();
  }, []);

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