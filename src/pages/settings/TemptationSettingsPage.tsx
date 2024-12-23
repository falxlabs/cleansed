import { useState, useEffect } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

export default function TemptationSettingsPage() {
  const { toast } = useToast();
  const [selectedSin, setSelectedSin] = useState("Pride");
  const [defaultLevel, setDefaultLevel] = useState([50]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('temptation_settings')
        .select('*')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        if (data.default_type) {
          setSelectedSin(data.default_type.charAt(0).toUpperCase() + data.default_type.slice(1));
        }
        if (data.default_intensity !== null) {
          setDefaultLevel([data.default_intensity]);
        }
      }
    } catch (error) {
      console.error('Error fetching temptation settings:', error);
      toast({
        title: "Error",
        description: "Failed to load temptation settings",
        variant: "destructive",
      });
    }
  };

  const getTemptationLevelDescription = (value: number) => {
    if (value <= 25) return TEMPTATION_LEVELS[0];
    if (value <= 50) return TEMPTATION_LEVELS[1];
    if (value <= 75) return TEMPTATION_LEVELS[2];
    return TEMPTATION_LEVELS[3];
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('temptation_settings')
        .update({
          default_type: selectedSin.toLowerCase() as Database["public"]["Enums"]["temptation_type"],
          default_intensity: defaultLevel[0],
        })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      
      toast({
        title: "Settings saved",
        description: "Your temptation settings have been updated",
      });
    } catch (error) {
      console.error('Error saving temptation settings:', error);
      toast({
        title: "Error",
        description: "Failed to save temptation settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsDetailLayout>
      <SettingsHeader />
      
      <SettingsSection title="Default Temptation">
        <div className="space-y-6">
          <TemptationTypeSelector
            value={selectedSin}
            onChange={setSelectedSin}
            showText={true}
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Default Intensity Level">
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">{getTemptationLevelDescription(defaultLevel[0])}</p>
          </div>
          <Slider
            value={defaultLevel}
            onValueChange={setDefaultLevel}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
            <span>Severe</span>
          </div>
        </div>
      </SettingsSection>

      <div className="mt-6">
        <Button onClick={handleSave} className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </SettingsDetailLayout>
  );
}