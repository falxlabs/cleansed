import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";

export default function NotificationsSettingsPage() {
  return (
    <SettingsDetailLayout>
      <SettingsHeader />
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Notification Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your notification preferences below.
        </p>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Email Notifications
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            SMS Notifications
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Push Notifications
          </label>
        </div>
      </div>
    </SettingsDetailLayout>
  );
}
