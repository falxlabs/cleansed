import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SettingsHeader } from "@/components/settings/SettingsHeader";

export default function SettingsPage() {
  const navigate = useNavigate();

  const settingsCategories = [
    { title: "Profile", path: "/settings/profile" },
    { title: "Daily Check-in", path: "/settings/daily-checkin" },
    { title: "Affirmation Message", path: "/settings/affirmation" },
    { title: "Temptation", path: "/settings/temptation" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Support", path: "/settings/support" },
  ];

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
      </div>
    </div>
  );
}