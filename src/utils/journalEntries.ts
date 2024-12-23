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
  }));
};

export const calculateStreak = (): number => {
  const entries = loadJournalEntries();
  if (entries.length === 0) return 0;

  // Sort entries by date in descending order (newest first)
  const sortedEntries = entries
    .filter(entry => entry.type.toLowerCase().includes('check-in'))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (sortedEntries.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if there's an entry for today or yesterday to maintain streak
  const latestEntry = new Date(sortedEntries[0].date);
  latestEntry.setHours(0, 0, 0, 0);

  if (latestEntry.getTime() !== today.getTime() && 
      latestEntry.getTime() !== yesterday.getTime()) {
    return 0;
  }

  // Calculate streak by checking consecutive days
  let currentDate = latestEntry;
  
  for (let i = 0; i < sortedEntries.length; i++) {
    const entryDate = new Date(sortedEntries[i].date);
    entryDate.setHours(0, 0, 0, 0);

    if (entryDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (entryDate.getTime() < currentDate.getTime()) {
      break;
    }
  }

  return streak;
};