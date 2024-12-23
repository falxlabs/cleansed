import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TemptationType } from "@/types/database";

export function useTemptationSettings() {
  const [selectedTemptation, setSelectedTemptation] = useState<TemptationType | "">("");
  const [temptationLevel, setTemptationLevel] = useState<number[]>([50]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTemptationSettings = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: settings } = await supabase
          .from('temptation_settings')
          .select('default_type, default_intensity')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (settings) {
          if (settings.default_type) setSelectedTemptation(settings.default_type);
          if (settings.default_intensity !== null) setTemptationLevel([settings.default_intensity]);
        }
      } catch (error) {
        console.error('Error loading temptation settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemptationSettings();
  }, []);

  return {
    selectedTemptation,
    setSelectedTemptation,
    temptationLevel,
    setTemptationLevel,
    isLoading
  };
}