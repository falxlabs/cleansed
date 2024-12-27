import { supabase } from "@/integrations/supabase/client";
import type { OnboardingFormData } from "./useOnboardingForm";
import type { TemptationType } from "@/types/database";

const validateTemptationType = (type: string): TemptationType => {
  const validTypes = ["pride", "greed", "lust", "envy", "gluttony", "wrath", "sloth"] as const;
  const normalizedType = type.toLowerCase() as TemptationType;
  if (!validTypes.includes(normalizedType)) {
    throw new Error(`Invalid temptation type: ${type}`);
  }
  return normalizedType;
};

export async function saveOnboardingDataToDatabase(userId: string, formData: OnboardingFormData) {
  try {
    // Ensure we have a valid session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("No active session found");
    }

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

    // Validate and save temptation settings
    const temptationType = validateTemptationType(formData.temptationType);
    const { error: temptationError } = await supabase
      .from('temptation_settings')
      .upsert({
        user_id: userId,
        default_type: temptationType,
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

    // Save user affirmation if provided
    if (formData.affirmation) {
      const { error: affirmationError } = await supabase
        .from('user_affirmations')
        .insert({
          user_id: userId,
          content: formData.affirmation,
        });

      if (affirmationError) {
        console.error('Error saving affirmation:', affirmationError);
        throw affirmationError;
      }
    }
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
}