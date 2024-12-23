import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const navigate = useNavigate();

  const settingsCategories = [
    { title: "Profile", path: "/settings/profile" },
    { title: "Affirmation Message", path: "/settings/affirmation" },
    { title: "Temptation", path: "/settings/temptation" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Support", path: "/settings/support" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-2">
        {settingsCategories.map((category) => (
          <Button
            key={category.path}
            variant="ghost"
            className="w-full justify-between"
            onClick={() => navigate(category.path)}
          >
            {category.title}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}