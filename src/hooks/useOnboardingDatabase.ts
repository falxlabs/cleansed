import { supabase } from "@/integrations/supabase/client";
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

    if (notificationError) {
      console.error('Error saving notification settings:', notificationError);
      throw notificationError;
    }

    // Save temptation settings
    const { error: temptationError } = await supabase
      .from('temptation_settings')
      .upsert({
        user_id: userId,
        default_type: formData.temptationType.toLowerCase(),
        default_intensity: formData.temptationLevel[0],
      });

    if (temptationError) {
      console.error('Error saving temptation settings:', temptationError);
      throw temptationError;
    }

    // Save profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        first_name: formData.firstName,
        age: formData.age ? parseInt(formData.age) : null,
      });

    if (profileError) {
      console.error('Error saving profile:', profileError);
      throw profileError;
    }
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
}