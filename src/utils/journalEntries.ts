interface JournalEntry {
  id: number;
  date: Date;
  type: string;
  resisted: boolean;
  level: string;
  trigger: string;
  notes: string;
  mood?: number;
  affirmation?: string;
  description?: string;
}

export const saveJournalEntry = (entry: Omit<JournalEntry, "id">) => {
  const entries = loadJournalEntries();
  const newEntry = {
    ...entry,
    id: Date.now(),
    resisted: entry.resisted || false,
    level: entry.level || "",
    trigger: entry.trigger || "",
    notes: entry.notes || "",
    description: entry.description || "",
  };
  
  entries.push(newEntry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  return newEntry;
};

export const loadJournalEntries = (): JournalEntry[] => {
  const entriesJson = localStorage.getItem("journalEntries");
  if (!entriesJson) return [];
  
  const entries = JSON.parse(entriesJson);
  return entries.map((entry: JournalEntry) => ({
    ...entry,
    date: new Date(entry.date),
    resisted: entry.resisted || false,
    level: entry.level || "",
    trigger: entry.trigger || "",
    notes: entry.notes || "",
    description: entry.description || "",
  }));
};

export const calculateStreak = (): number => {
  const entries = loadJournalEntries();
  if (entries.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Sort entries by date in descending order
  const sortedEntries = entries
    .filter(entry => entry.type.toLowerCase().includes('check-in'))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (sortedEntries.length === 0) return 0;

  // Check if there's an entry for today or yesterday to maintain the streak
  const lastEntryDate = new Date(sortedEntries[0].date);
  lastEntryDate.setHours(0, 0, 0, 0);

  if (lastEntryDate.getTime() !== today.getTime() && 
      lastEntryDate.getTime() !== yesterday.getTime()) {
    return 0;
  }

  // Count consecutive days
  let currentDate = lastEntryDate;
  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);

    if (currentDate.getTime() === entryDate.getTime() || 
        currentDate.getTime() === entryDate.getTime() + 86400000) {
      streak++;
      currentDate = entryDate;
    } else {
      break;
    }
  }

  return streak;
};