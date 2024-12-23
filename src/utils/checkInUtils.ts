export const isCheckInCompletedForToday = () => {
  const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
  const today = new Date().toISOString().split('T')[0];
  
  return entries.some((entry: any) => {
    const entryDate = new Date(entry.date).toISOString().split('T')[0];
    return entryDate === today && entry.type.toLowerCase().includes('check-in');
  });
};

export const getCheckInTime = (): string => {
  return localStorage.getItem("checkInTime") || "09:00";
};

export const setCheckInTime = (time: string) => {
  localStorage.setItem("checkInTime", time);
};

export const shouldShowCheckIn = (): boolean => {
  const checkInTime = getCheckInTime();
  const now = new Date();
  const [hours, minutes] = checkInTime.split(':').map(Number);
  const checkInDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  
  return now >= checkInDateTime && !isCheckInCompletedForToday();
};