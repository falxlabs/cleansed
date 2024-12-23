import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { OnboardingFormData } from "./useOnboardingForm";

export async function saveOnboardingDataToDatabase(userId: string, formData: OnboardingFormData) {
  try {
    // Save notification settings
    const { error: notificationError } = await supabase
      .from('notification_settings')
      .upsert({
        user_id: userId,
        check_in_time: formData.checkInTime,
      });

    if (notificationError) throw notificationError;

    // Save temptation settings
    const temptationType = formData.temptationType?.toLowerCase() as Database["public"]["Enums"]["temptation_type"];
    const { error: temptationError } = await supabase
      .from('temptation_settings')
      .upsert({
        user_id: userId,
        default_type: temptationType,
        default_intensity: formData.temptationLevel?.[0] ?? 50,
      });

    if (temptationError) throw temptationError;

    // Save custom affirmation if provided
    if (formData.affirmation) {
      const { error: affirmationError } = await supabase
        .from('user_affirmations')
        .insert({
          user_id: userId,
          content: formData.affirmation,
        });

      if (affirmationError) throw affirmationError;
    }
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
}