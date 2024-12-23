import { useState, useEffect } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function NotificationsSettingsPage() {
  const { toast } = useToast();
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_settings')
        .select('email_enabled, push_enabled')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setEmailEnabled(data.email_enabled || false);
        setPushEnabled(data.push_enabled || false);
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error);
      toast({
        title: "Error",
        description: "Failed to load notification settings",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('notification_settings')
        .update({
          email_enabled: emailEnabled,
          push_enabled: pushEnabled,
        })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (error) {
      console.error('Error saving notification settings:', error);
      toast({
        title: "Error",
        description: "Failed to save notification settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsDetailLayout>
      <SettingsHeader title="Notification Settings" />
      <SettingsSection title="Notification Preferences">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive daily check-in reminders via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications on your device
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
            />
          </div>

          <Button onClick={handleSave} className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </SettingsSection>
    </SettingsDetailLayout>
  );
}