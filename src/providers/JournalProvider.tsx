import React, { createContext, useContext } from 'react';
import { useJournalEntries } from '@/hooks/journal/useJournalQueries';
import { transformJournalData } from '@/utils/journalTransformers';
import type { Entry } from "@/components/journal/types";

interface JournalContextType {
  entries: Entry[];
  isLoading: boolean;
  error: Error | null;
  refetchEntries: () => Promise<void>;
}

const JournalContext = createContext<JournalContextType>({
  entries: [],
  isLoading: false,
  error: null,
  refetchEntries: async () => {},
});

export const useJournal = () => useContext(JournalContext);

export const JournalProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error, refetch } = useJournalEntries();

  const refetchEntries = async () => {
    await refetch();
  };

  const value = {
    entries: transformJournalData(data || []),
    isLoading,
    error: error as Error | null,
    refetchEntries,
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
};