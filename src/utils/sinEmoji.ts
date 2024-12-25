export const SINS = {
  pride: "👑",
  greed: "💰",
  lust: "👄",
  envy: "👀",
  gluttony: "🍽️",
  wrath: "😠",
  sloth: "🦥"
} as const;

export type SinType = keyof typeof SINS;

export const getSinEmoji = (type: string | undefined) => {
  if (!type) return "";
  
  const typeLower = type.toLowerCase() as SinType;
  return SINS[typeLower] || "";
};