export const SINS = {
  pride: "👑",
  greed: "💰",
  lust: "👄",
  envy: "👀",
  gluttony: "🍽️",
  wrath: "😠",
  sloth: "🦥"
} as const;

export const getSinEmoji = (type: string) => {
  const typeLower = type.toLowerCase();
  // Check if it's a check-in
  if (typeLower.includes("check-in")) {
    // For check-ins, look for sin type in the trigger field
    return SINS[typeLower.split(" ")[0] as keyof typeof SINS] || "📝";
  }
  
  // Return the sin emoji if it's one of the 7 sins, otherwise return check-in emoji
  return SINS[typeLower as keyof typeof SINS] || "📝";
};