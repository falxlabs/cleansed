import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SettingsSection } from "./SettingsSection";

export function AccountSettings() {
  return (
    <SettingsSection title="Account Settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            disabled
            value="user@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value="username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="affirmation">Daily Affirmation</Label>
          <Textarea
            id="affirmation"
            placeholder="Enter your daily affirmation"
            defaultValue="I am a child of God, created for His purpose."
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            This affirmation will be shown during your daily check-ins
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>
    </SettingsSection>
  );
}