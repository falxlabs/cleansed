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
        console.log("Loading temptation settings...");
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user found, skipping settings load");
          setIsLoading(false);
          return;
        }

        console.log("Fetching settings for user:", user.id);
        const { data: settings, error } = await supabase
          .from('temptation_settings')
          .select('default_type, default_intensity')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching temptation settings:', error);
          throw error;
        }

        console.log("Retrieved settings:", settings);
        
        if (settings) {
          if (settings.default_type) {
            console.log("Setting default type to:", settings.default_type);
            setSelectedTemptation(settings.default_type);
          }
          if (settings.default_intensity !== null) {
            console.log("Setting default intensity to:", settings.default_intensity);
            setTemptationLevel([settings.default_intensity]);
          }
        } else {
          console.log("No settings found for user");
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