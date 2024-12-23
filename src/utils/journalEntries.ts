interface JournalEntry {
  id: number;
  date: Date;
  type: string;
  resisted?: boolean;
  level?: string;
  trigger?: string;
  notes?: string;
  mood?: number;
  affirmation?: string;
}

export const saveJournalEntry = (entry: Omit<JournalEntry, "id">) => {
  const entries = loadJournalEntries();
  const newEntry = {
    ...entry,
    id: Date.now(),
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
  }));
};