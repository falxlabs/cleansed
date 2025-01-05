import { useState } from "react";
import { Entry } from "./types";

export const useEntrySelection = (onDelete?: (id: number) => void) => {
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const handleEntryClick = (entry: Entry) => {
    const entryData = {
      id: entry.id,
      date: new Date(
        entry.entry_type === 'temptation' && entry.temptation_entries[0]?.occurred_at
          ? entry.temptation_entries[0].occurred_at
          : entry.created_at
      ),
      type: entry.entry_type,
      level: entry.entry_type === 'check-in' 
        ? entry.checkin_entries[0]?.intensity_level?.toString() 
        : entry.temptation_entries[0]?.intensity_level?.toString(),
      trigger: entry.entry_type === 'check-in'
        ? entry.checkin_entries[0]?.temptation_type
        : entry.temptation_entries[0]?.temptation_type,
      notes: '',
      mood: entry.entry_type === 'check-in' ? entry.checkin_entries[0]?.mood_score : undefined,
      description: entry.entry_type === 'check-in'
        ? entry.checkin_entries[0]?.mood_description
        : entry.temptation_entries[0]?.temptation_details,
      resisted: entry.entry_type === 'temptation' ? entry.temptation_entries[0]?.resisted : undefined,
      temptation_type: entry.entry_type === 'temptation' ? entry.temptation_entries[0]?.temptation_type : undefined,
      resistance_strategy: entry.entry_type === 'temptation' ? entry.temptation_entries[0]?.resistance_strategy : undefined
    };
    setSelectedEntry(entryData);
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
    setSelectedEntry(null);
  };

  return {
    selectedEntry,
    setSelectedEntry,
    handleEntryClick,
    handleDelete
  };
};