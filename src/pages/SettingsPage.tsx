import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SettingsHeader } from "@/components/settings/SettingsHeader";

export default function SettingsPage() {
  const settingsOptions = [
    { title: "Profile", path: "/settings/profile" },
    { title: "Daily Affirmation", path: "/settings/affirmation" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Support", path: "/settings/support" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <div className="space-y-2">
        {settingsOptions.map((option) => (
          <Link
            key={option.path}
            to={option.path}
            className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent transition-colors"
          >
            <span className="font-medium">{option.title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}