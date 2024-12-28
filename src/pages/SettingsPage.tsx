import { ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContentSection } from "@/components/layout/ContentSection";
import { ActionButton } from "@/components/dashboard/ActionButton";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const settingsCategories = [
    { title: "Profile", path: "/settings/profile", requiresAuth: true },
    { title: "Daily Check-in", path: "/settings/daily-checkin", requiresAuth: true },
    { title: "Affirmation Message", path: "/settings/affirmation", requiresAuth: true },
    { title: "Temptation Defaults", path: "/settings/temptation", requiresAuth: true },
    { title: "Notifications", path: "/settings/notifications", requiresAuth: true },
    { title: "Support", path: "/settings/support", requiresAuth: false },
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });

      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGetStarted = () => {
    navigate("/onboarding");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <PageContainer fullHeight className="min-h-screen flex flex-col">
      <ContentSection className="flex-1 max-w-2xl mx-auto w-full">
        <div className="space-y-6 h-full flex flex-col">
          <SettingsHeader />
          
          <div className="flex-1 space-y-2">
            {settingsCategories.map((category) => {
              const isLocked = !user && category.requiresAuth;
              
              return (
                <Button
                  key={category.path}
                  variant="ghost"
                  className="w-full justify-between hover:bg-muted"
                  onClick={() => !isLocked && navigate(category.path)}
                  disabled={isLocked}
                >
                  <span>{category.title}</span>
                  <div className="flex items-center">
                    {isLocked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
          
          <div className="space-y-2 mt-auto pb-6">
            {user ? (
              <ActionButton 
                variant="destructive"
                label="Sign Out"
                onClick={handleSignOut}
                className="w-full"
              />
            ) : (
              <>
                <ActionButton 
                  variant="default"
                  label="Get Started"
                  onClick={handleGetStarted}
                  className="w-full"
                />
                <ActionButton 
                  variant="outline"
                  label="Sign In"
                  onClick={handleSignIn}
                  className="w-full"
                />
              </>
            )}
          </div>
        </div>
      </ContentSection>
    </PageContainer>
  );
}