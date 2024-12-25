import { supabase } from "@/integrations/supabase/client";

export const getCheckInTime = () => {
  return localStorage.getItem('checkInTime') || '09:00';
};

export const setCheckInTime = (time: string) => {
  localStorage.setItem('checkInTime', time);
};

export const shouldShowCheckIn = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return false;

  // Get user's check-in time setting
  const { data: settings } = await supabase
    .from('notification_settings')
    .select('check_in_time')
    .eq('user_id', user.user.id)
    .single();

  const checkInTime = settings?.check_in_time || '09:00';
  
  // Get today's date and check-in time
  const now = new Date();
  const [hours, minutes] = checkInTime.split(':');
  const todayCheckIn = new Date(now);
  todayCheckIn.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

  // Check if current time is past check-in time
  if (now < todayCheckIn) {
    return false;
  }

  // Check if user has already completed check-in today
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const { data: existingCheckIn } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('entry_type', 'check-in')
    .eq('user_id', user.user.id)
    .gte('created_at', startOfDay.toISOString())
    .lt('created_at', endOfDay.toISOString())
    .maybeSingle();

  return !existingCheckIn;
};