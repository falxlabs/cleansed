import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SettingsSection } from "./SettingsSection";

export function NotificationsSettings() {
  return (
    <SettingsSection title="Notifications Settings">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="daily-reminder">Daily Check-in Reminder</Label>
          <Switch id="daily-reminder" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="weekly-summary">Weekly Progress Summary</Label>
          <Switch id="weekly-summary" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="achievement">Achievement Notifications</Label>
          <Switch id="achievement" />
        </div>
      </div>
    </SettingsSection>
  );
}