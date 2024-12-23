export const getTimeEmoji = (hour: number) => {
  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "☀️";
  if (hour >= 17 && hour < 21) return "🌆";
  return "🌙";
};