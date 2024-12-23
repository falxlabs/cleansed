import { NotificationsSettings } from "@/components/settings/NotificationsSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";

export default function NotificationsSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <NotificationsSettings />
    </div>
  );
}