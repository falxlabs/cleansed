import { useState, useEffect } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export default function DailyCheckInSettingsPage() {
  const [checkInTime, setCheckInTime] = useState("20:00");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_settings')
        .select('check_in_time')
        .maybeSingle();

      if (error) throw error;

      if (data?.check_in_time) {
        setCheckInTime(data.check_in_time);
      }
    } catch (error) {
      console.error('Error fetching check-in settings:', error);
      toast({
        title: "Error",
        description: "Failed to load check-in settings",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('notification_settings')
        .update({ check_in_time: checkInTime })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your daily check-in time has been updated.",
      });
    } catch (error) {
      console.error('Error saving check-in settings:', error);
      toast({
        title: "Error",
        description: "Failed to save check-in settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                onChange={(e) => setCheckInTime(e.target.value)}
                className="max-w-[200px]"
              />
              <p className="text-sm text-muted-foreground">
                Set the time when your daily check-in reminder should appear.
              </p>
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
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