import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useDataFetching<T>(
  tableName: string,
  options: {
    realtime?: boolean;
    cacheLocally?: boolean;
    where?: Record<string, any>;
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let subscription: any;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data from ${tableName}`);
        
        let query = supabase.from(tableName).select('*');
        
        if (options.where) {
          Object.entries(options.where).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }
        
        const { data: fetchedData, error } = await query;

        if (error) throw error;

        setData(fetchedData || []);
        
        // Cache locally if specified
        if (options.cacheLocally) {
          sessionStorage.setItem(`${tableName}_cache`, JSON.stringify(fetchedData));
        }

        // Subscribe to real-time changes if specified
        if (options.realtime) {
          subscription = supabase
            .channel(`${tableName}_changes`)
            .on('postgres_changes', 
              { event: '*', schema: 'public', table: tableName },
              (payload) => {
                console.log('Real-time update received:', payload);
                // Refresh the data
                fetchData();
              }
            )
            .subscribe();
        }

      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
        toast({
          title: "Error",
          description: `Failed to fetch ${tableName}. Please try again.`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Try to load from cache first if cacheLocally is enabled
    if (options.cacheLocally) {
      const cached = sessionStorage.getItem(`${tableName}_cache`);
      if (cached) {
        setData(JSON.parse(cached));
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [tableName, JSON.stringify(options.where)]);

  return { data, loading };
}