import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationsSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <SettingsSection title="Notifications">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Check-in Reminder</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily reminder to complete your check-in
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Summary</Label>
              <p className="text-sm text-muted-foreground">
                Get a weekly summary of your progress
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}