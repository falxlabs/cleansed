import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/types/database";

export async function getProfile() {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }

  return profile;
}

export async function updateProfile(updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
}