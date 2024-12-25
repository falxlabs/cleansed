import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];

export function useDataFetching<T>(
  tableName: TableName,
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
            if (value !== undefined) {
              query = query.eq(key, value);
            }
          });
        }
        
        const { data: fetchedData, error } = await query;

        if (error) throw error;

        setData((fetchedData || []) as T[]);
        
        if (options.cacheLocally) {
          sessionStorage.setItem(`${tableName}_cache`, JSON.stringify(fetchedData));
        }

        if (options.realtime) {
          subscription = supabase
            .channel(`${tableName}_changes`)
            .on('postgres_changes', 
              { event: '*', schema: 'public', table: tableName },
              (payload) => {
                console.log('Real-time update received:', payload);
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

    if (options.cacheLocally) {
      const cached = sessionStorage.getItem(`${tableName}_cache`);
      if (cached) {
        setData(JSON.parse(cached) as T[]);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [tableName, JSON.stringify(options.where)]);

  return { data, loading };
}