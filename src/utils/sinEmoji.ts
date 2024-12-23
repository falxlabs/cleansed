export const SINS = {
  pride: "👑",
  greed: "💰",
  lust: "👄",
  envy: "👀",
  gluttony: "🍽️",
  wrath: "😠",
  sloth: "🦥"
} as const;

export const getSinEmoji = (type: string | undefined) => {
  if (!type) return "📝";
  
  const typeLower = type.toLowerCase();
  // Check if it's a check-in
  if (typeLower.includes("check-in")) {
    return "📝";
  }
  
  // Return the sin emoji if it's one of the 7 sins
  return SINS[typeLower as keyof typeof SINS] || "📝";
};