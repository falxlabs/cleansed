import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

export const useLandingNavigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const goToOnboarding = () => navigate("/onboarding");
  const goToSignIn = () => navigate("/signin");
  const goToDashboard = () => navigate("/dashboard");

  return {
    goToOnboarding,
    goToSignIn,
    goToDashboard
  };
};