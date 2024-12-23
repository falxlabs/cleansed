import { useState, useEffect } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSin = localStorage.getItem("defaultTemptation");
    const savedLevel = localStorage.getItem("defaultTemptationLevel");
    
    if (savedSin) setSelectedSin(savedSin);
    if (savedLevel) setDefaultLevel([parseInt(savedLevel)]);
  }, []);

  const getTemptationLevelDescription = (value: number) => {
    if (value <= 25) return TEMPTATION_LEVELS[0];
    if (value <= 50) return TEMPTATION_LEVELS[1];
    if (value <= 75) return TEMPTATION_LEVELS[2];
    return TEMPTATION_LEVELS[3];
  };

  const handleSave = () => {
    localStorage.setItem("defaultTemptation", selectedSin);
    localStorage.setItem("defaultTemptationLevel", defaultLevel[0].toString());
    
    toast({
      title: "Settings saved",
      description: "Your temptation settings have been updated",
    });
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
        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </SettingsDetailLayout>
  );
}