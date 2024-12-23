import { useState, useEffect } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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