import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SettingsSection } from "./SettingsSection";

export function DailyAffirmationSettings() {
  return (
    <SettingsSection title="Daily Affirmation">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="affirmation">Your Daily Affirmation</Label>
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