export const getSeverityEmoji = (level: string) => {
  const levelNum = parseInt(level);
  if (levelNum <= 25) return "🟢";
  if (levelNum <= 50) return "🟡";
  if (levelNum <= 75) return "🟠";
  return "🔴";
};