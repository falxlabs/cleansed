export const getSeverityEmoji = (level: string) => {
  const levelLower = level.toLowerCase();
  if (levelLower.includes("low")) return "🟢";
  if (levelLower.includes("medium")) return "🟡";
  if (levelLower.includes("high")) return "🟠";
  return "🔴";
};