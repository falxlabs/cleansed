import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const settingsCategories = [
    { title: "Profile", path: "/settings/profile" },
    { title: "Daily Check-in", path: "/settings/daily-checkin" },
    { title: "Affirmation Message", path: "/settings/affirmation" },
    { title: "Temptation", path: "/settings/temptation" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Support", path: "/settings/support" },
  ];

  const handleSignOut = () => {
    // Clear any stored user data
    localStorage.clear();
    
    // Show success toast
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });

    // Redirect to landing page
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <SettingsHeader />
        <div className="space-y-2">
          {settingsCategories.map((category) => (
            <Button
              key={category.path}
              variant="ghost"
              className="w-full justify-between hover:bg-muted"
              onClick={() => navigate(category.path)}
            >
              {category.title}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ))}
        </div>
        
        {/* Conditional rendering of Sign Out/Sign Up button */}
        <div className="mt-8">
          {user ? (
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleSignIn}
            >
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}