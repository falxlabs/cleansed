export const getCheckInTime = () => {
  return localStorage.getItem('checkInTime') || '09:00';
};

export const setCheckInTime = (time: string) => {
  localStorage.setItem('checkInTime', time);
};

export const shouldShowCheckIn = () => {
  const lastCheckIn = localStorage.getItem('lastCheckIn');
  if (!lastCheckIn) return true;

  const today = new Date().toDateString();
  const lastCheckInDate = new Date(lastCheckIn).toDateString();
  
  return today !== lastCheckInDate;
};