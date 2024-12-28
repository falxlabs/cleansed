import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MissionStepProps {
  selectedStatement: string;
  onStatementChange: (value: string) => void;
}

export function MissionStep({
  selectedStatement,
  onStatementChange,
}: MissionStepProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserAffirmation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Set a sample affirmation for non-authenticated users
          onStatementChange("Through Christ who strengthens me, I can overcome any challenge.");
          setIsLoading(false);
          return;
        }

        const { data: userAffirmation, error } = await supabase
          .from('user_affirmations')
          .select('content')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (userAffirmation) {
          onStatementChange(userAffirmation.content);
        } else if (selectedStatement) {
          // If no existing affirmation but we have a selected statement, save it
          const { error: insertError } = await supabase
            .from('user_affirmations')
            .upsert({
              user_id: user.id,
              content: selectedStatement
            });

          if (insertError) {
            console.error('Error saving affirmation:', insertError);
            toast({
              title: "Error",
              description: "Failed to save your affirmation. Please try again.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching/saving affirmation:', error);
        toast({
          title: "Error",
          description: "Failed to load or save your affirmation. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAffirmation();
  }, [onStatementChange, selectedStatement]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-black">Daily Affirmation</h2>
        <p className="text-center text-muted-foreground mb-6">Loading your affirmation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-black">Daily Affirmation</h2>
      <p className="text-center text-muted-foreground mb-6">
        Try saying it out loud - speaking affirmations has the strongest impact
      </p>
      
      <Card className="p-6">
        <p className="text-lg text-center font-medium">{selectedStatement}</p>
      </Card>
    </div>
  );
}