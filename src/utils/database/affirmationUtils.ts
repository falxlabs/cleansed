import { supabase } from "@/integrations/supabase/client";

export async function getPredefinedAffirmations() {
  const { data, error } = await supabase
    .from('affirmations')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching affirmations:', error);
    throw error;
  }

  return data;
}

export async function getUserAffirmations() {
  const { data, error } = await supabase
    .from('user_affirmations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user affirmations:', error);
    throw error;
  }

  return data;
}