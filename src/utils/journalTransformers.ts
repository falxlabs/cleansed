import type { Entry } from "@/components/journal/types";

export const transformJournalData = (data: Entry[]) => {
  if (!data) return [];

  return data.map(entry => ({
    ...entry,
    // Ensure temptation_entries is always an array
    temptation_entries: Array.isArray(entry.temptation_entries) 
      ? entry.temptation_entries 
      : entry.temptation_entries 
        ? [entry.temptation_entries] 
        : [],
    // Ensure checkin_entries is always an array
    checkin_entries: Array.isArray(entry.checkin_entries)
      ? entry.checkin_entries
      : entry.checkin_entries
        ? [entry.checkin_entries]
        : []
  }));
};