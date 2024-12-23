import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface MissionStepProps {
  selectedStatement: string;
  onStatementChange: (value: string) => void;
}

export function MissionStep({
  selectedStatement,
  onStatementChange,
}: MissionStepProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAffirmation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: userAffirmation } = await supabase
          .from('user_affirmations')
          .select('content')
          .eq('user_id', user.id)
          .maybeSingle();

        if (userAffirmation) {
          onStatementChange(userAffirmation.content);
        }
      } catch (error) {
        console.error('Error fetching affirmation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAffirmation();
  }, [onStatementChange]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">Daily Affirmation</h2>
        <p className="text-center text-muted-foreground mb-6">Loading your affirmation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Daily Affirmation</h2>
      <p className="text-center text-muted-foreground mb-6">
        Your chosen affirmation for today
      </p>
      
      <Card className="p-6">
        <p className="text-lg text-center font-medium">{selectedStatement}</p>
      </Card>
    </div>
  );
}