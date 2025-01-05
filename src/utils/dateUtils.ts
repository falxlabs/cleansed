export const getUserLocalDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const getDateFromUTC = (utcString: string) => {
  const date = new Date(utcString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getDaysDifference = (date1: Date, date2: Date) => {
  const timeDifference = date1.getTime() - date2.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};