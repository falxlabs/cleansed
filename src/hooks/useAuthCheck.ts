import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useAuthCheck() {
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please go to Settings to sign in or create an account to save your entries.",
          variant: "destructive",
        });
      }
      return user;
    };

    checkAuthStatus();
  }, [toast]);
}