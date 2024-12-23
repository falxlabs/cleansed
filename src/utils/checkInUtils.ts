export const getCheckInTime = () => {
  return localStorage.getItem('checkInTime') || '09:00';
};

export const setCheckInTime = (time: string) => {
  localStorage.setItem('checkInTime', time);
};