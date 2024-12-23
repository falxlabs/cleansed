import { useState } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCheckInTime, setCheckInTime } from "@/utils/checkInUtils";
import { Card } from "@/components/ui/card";

export default function DailyCheckInSettingsPage() {
  const [checkInTime, setLocalCheckInTime] = useState(getCheckInTime());
  const { toast } = useToast();

  const handleSave = () => {
    setCheckInTime(checkInTime);
    toast({
      title: "Settings saved",
      description: "Your daily check-in time has been updated.",
    });
  };

  return (
    <SettingsDetailLayout>
      <SettingsHeader />
      <div className="space-y-6">
        <SettingsSection title="Daily Check-in Settings">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="checkInTime">Daily Check-in Time</Label>
              <Input
                id="checkInTime"
                type="time"
                value={checkInTime}
                onChange={(e) => setLocalCheckInTime(e.target.value)}
                className="max-w-[200px]"
              />
              <p className="text-sm text-muted-foreground">
                Set the time when your daily check-in reminder should appear.
              </p>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </SettingsSection>

        <Card className="p-4 bg-muted/50">
          <h3 className="font-medium mb-2">About Daily Check-ins</h3>
          <p className="text-sm text-muted-foreground">
            Daily check-ins help you maintain consistency and track your progress.
            You'll receive a notification at your specified time to complete your
            daily check-in. Remember, you can only complete one check-in per day.
          </p>
        </Card>
      </div>
    </SettingsDetailLayout>
  );
}