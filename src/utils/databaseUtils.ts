import { supabase } from "@/integrations/supabase/client";
import type { 
  Profile, 
  JournalEntry, 
  TemptationEntry, 
  CheckInEntry,
  NotificationSettings,
  TemptationSettings,
  UserAffirmation,
  Affirmation
} from "@/types/database";

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

export async function getRecentJournalEntries(limit: number = 5) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select(`
      *,
      temptation_entries(*),
      checkin_entries(
        *,
        affirmation:affirmations(*),
        custom_affirmation:user_affirmations(*)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }

  return data;
}