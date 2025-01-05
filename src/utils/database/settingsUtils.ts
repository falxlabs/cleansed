import { supabase } from "@/integrations/supabase/client";

export async function getNotificationSettings() {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching notification settings:', error);
    throw error;
  }

  return data;
}

export async function getTemptationSettings() {
  const { data, error } = await supabase
    .from('temptation_settings')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching temptation settings:', error);
    throw error;
  }

  return data;
}