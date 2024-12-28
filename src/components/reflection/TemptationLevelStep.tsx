import { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const TEMPTATION_LEVELS = [
  "I can resist easily",
  "It's challenging but manageable",
  "I struggle significantly",
  "Almost impossible to resist"
] as const;

interface TemptationLevelStepProps {
  sliderValue: number[];
  temptationLevel: string;
  onSliderChange: (value: number[]) => void;
}

export const TemptationLevelStep = ({
  sliderValue,
  temptationLevel,
  onSliderChange,
}: TemptationLevelStepProps) => {
  useEffect(() => {
    const loadDefaultSettings = async () => {
      if (sliderValue[0] !== 0) {
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: settings } = await supabase
          .from('temptation_settings')
          .select('default_intensity')
          .eq('user_id', user.id)
          .single();
        
        if (settings && typeof settings.default_intensity === 'number') {
          onSliderChange([settings.default_intensity]);
        }
      } catch (error) {
        console.error('Error loading default temptation level:', error);
      }
    };

    loadDefaultSettings();
  }, []); 

  const getTemptationLevelDescription = (value: number) => {
    if (value <= 25) return TEMPTATION_LEVELS[0];
    if (value <= 50) return TEMPTATION_LEVELS[1];
    if (value <= 75) return TEMPTATION_LEVELS[2];
    return TEMPTATION_LEVELS[3];
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Temptation Level</h2>
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">{
              sliderValue[0] <= 25 ? "🟢" :
              sliderValue[0] <= 50 ? "🟡" :
              sliderValue[0] <= 75 ? "🟠" : "🔴"
            }</span>
            <p className="text-muted-foreground">{getTemptationLevelDescription(sliderValue[0])}</p>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={onSliderChange}
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
      </Card>
    </div>
  );
};