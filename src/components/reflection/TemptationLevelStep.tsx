import { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
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
  }, [onSliderChange]);

  const getTemptationLevelDescription = (value: number) => {
    if (value <= 25) return TEMPTATION_LEVELS[0];
    if (value <= 50) return TEMPTATION_LEVELS[1];
    if (value <= 75) return TEMPTATION_LEVELS[2];
    return TEMPTATION_LEVELS[3];
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Temptation Level</h2>
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-4xl mb-4 block">{
            sliderValue[0] <= 25 ? "🟢" :
            sliderValue[0] <= 50 ? "🟡" :
            sliderValue[0] <= 75 ? "🟠" : "🔴"
          }</span>
          <h3 className="text-xl font-semibold mb-2">{getTemptationLevelDescription(sliderValue[0])}</h3>
          <p className="text-muted-foreground">
            This helps us understand your struggle
          </p>
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
    </div>
  );
};