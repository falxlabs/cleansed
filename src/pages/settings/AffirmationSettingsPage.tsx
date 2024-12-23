import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AffirmationSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <SettingsSection title="Daily Affirmation">
        <div className="space-y-4">
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
    </div>
  );
}