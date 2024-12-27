import { Entry } from "@/components/journal/types";
import { decryptText } from "@/utils/encryption";

export async function transformJournalData(data: any[]): Promise<Entry[]> {
  return Promise.all(data.map(async (entry) => {
    const transformedEntry = {
      ...entry,
      // Ensure temptation_entries is always an array
      temptation_entries: Array.isArray(entry.temptation_entries) 
        ? await Promise.all(entry.temptation_entries.map(async (te: any) => {
            if (te.encrypted_details) {
              try {
                const decryptedDetails = await decryptText(te.encrypted_details, /* need encryption key */);
                return {
                  ...te,
                  temptation_details: decryptedDetails
                };
              } catch (error) {
                console.error('Error decrypting details:', error);
                return te;
              }
            }
            return te;
          }))
        : entry.temptation_entries 
          ? [entry.temptation_entries] 
          : [],
      // Ensure checkin_entries is always an array
      checkin_entries: Array.isArray(entry.checkin_entries)
        ? entry.checkin_entries
        : entry.checkin_entries
          ? [entry.checkin_entries]
          : []
    });

    return transformedEntry;
  }));
}

function getSampleData(): Entry[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  const fourDaysAgo = new Date(today);
  fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

  // Helper function to set time
  const setTime = (date: Date, hours: number, minutes: number = 0) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    return newDate;
  };

  return [
    // Today's entries
    {
      id: 1,
      created_at: setTime(today, 8, 30).toISOString(),
      entry_type: 'check-in' as const,
      checkin_entries: [{
        mood_score: 75,
        temptation_type: 'pride',
        intensity_level: 30,
        mood_description: 'Starting the day with prayer and gratitude'
      }],
      temptation_entries: []
    },
        {
          id: 2,
          created_at: setTime(today, 11, 15).toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'lust',
            intensity_level: 85,
            resisted: true,
            temptation_details: 'Had strong urges but managed to resist through prayer',
            resistance_strategy: 'Prayed and went for a walk'
          }],
          checkin_entries: []
        },
        {
          id: 3,
          created_at: setTime(today, 14, 45).toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'pride',
            intensity_level: 45,
            resisted: true,
            temptation_details: 'Caught myself being judgmental',
            resistance_strategy: 'Practiced humility and prayed for guidance'
          }],
          checkin_entries: []
        },
        {
          id: 4,
          created_at: setTime(today, 16, 20).toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 65,
            temptation_type: 'sloth',
            intensity_level: 40,
            mood_description: 'Afternoon reflection, staying focused'
          }],
          temptation_entries: []
        },
        // Yesterday's entries
        {
          id: 5,
          created_at: setTime(yesterday, 9, 45).toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'lust',
            intensity_level: 85,
            resisted: false,
            temptation_details: 'Struggled with impure thoughts',
            resistance_strategy: 'Tried to pray but gave in'
          }],
          checkin_entries: []
        },
        {
          id: 6,
          created_at: setTime(yesterday, 19, 30).toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 40,
            temptation_type: 'lust',
            intensity_level: 60,
            mood_description: 'Feeling weak after today\'s struggle'
          }],
          temptation_entries: []
        },
        // Two days ago
        {
          id: 7,
          created_at: setTime(twoDaysAgo, 10, 15).toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 65,
            temptation_type: 'pride',
            intensity_level: 45,
            mood_description: 'Doing better today, staying humble'
          }],
          temptation_entries: []
        },
        // Three days ago
        {
          id: 8,
          created_at: setTime(threeDaysAgo, 7, 30).toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 80,
            temptation_type: 'sloth',
            intensity_level: 20,
            mood_description: 'Feeling motivated and productive'
          }],
          temptation_entries: []
        },
        {
          id: 9,
          created_at: setTime(threeDaysAgo, 15, 45).toISOString(),
          entry_type: 'temptation' as const,
          temptation_entries: [{
            temptation_type: 'wrath',
            intensity_level: 70,
            resisted: true,
            temptation_details: 'Got very angry at work but managed to stay calm',
            resistance_strategy: 'Took deep breaths and stepped away'
          }],
          checkin_entries: []
        },
        // Four days ago
        {
          id: 10,
          created_at: setTime(fourDaysAgo, 12, 0).toISOString(),
          entry_type: 'check-in' as const,
          checkin_entries: [{
            mood_score: 55,
            temptation_type: 'greed',
            intensity_level: 40,
            mood_description: 'Struggling with contentment today'
          }],
          temptation_entries: []
        }
  ];
}
