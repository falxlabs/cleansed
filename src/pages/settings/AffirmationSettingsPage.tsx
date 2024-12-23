import { useState, useEffect } from "react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const predefinedAffirmations = [
  "I am a child of God, created for His purpose.",
  "Through Christ who strengthens me, I can overcome any challenge.",
  "God's love guides and protects me in all that I do.",
  "I am fearfully and wonderfully made by God.",
];

export default function AffirmationSettingsPage() {
  const { toast } = useToast();
  const [affirmationType, setAffirmationType] = useState("predefined");
  const [selectedAffirmation, setSelectedAffirmation] = useState(predefinedAffirmations[0]);
  const [customAffirmation, setCustomAffirmation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserAffirmation();
  }, []);

  const fetchUserAffirmation = async () => {
    try {
      const { data: userAffirmation, error } = await supabase
        .from('user_affirmations')
        .select('*')
        .maybeSingle();

      if (error) throw error;

      if (userAffirmation) {
        setAffirmationType("custom");
        setCustomAffirmation(userAffirmation.content);
      }
    } catch (error) {
      console.error('Error fetching user affirmation:', error);
      toast({
        title: "Error",
        description: "Failed to load affirmation settings",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      if (affirmationType === "custom") {
        // Delete any existing custom affirmations and create a new one
        await supabase
          .from('user_affirmations')
          .delete()
          .eq('user_id', user.id);

        const { error } = await supabase
          .from('user_affirmations')
          .insert({
            user_id: user.id,
            content: customAffirmation,
          });

        if (error) throw error;
      } else {
        // If switching to predefined, remove any custom affirmations
        await supabase
          .from('user_affirmations')
          .delete()
          .eq('user_id', user.id);
      }

      toast({
        title: "Settings saved",
        description: "Your affirmation settings have been updated",
      });
    } catch (error) {
      console.error('Error saving affirmation settings:', error);
      toast({
        title: "Error",
        description: "Failed to save affirmation settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsDetailLayout>
      <SettingsHeader />
      <SettingsSection title="Daily Affirmation">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Choose your affirmation type</Label>
            <RadioGroup
              value={affirmationType}
              onValueChange={setAffirmationType}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="predefined" id="predefined" />
                <Label htmlFor="predefined">Use a predefined affirmation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Write your own affirmation</Label>
              </div>
            </RadioGroup>
          </div>

          {affirmationType === "predefined" ? (
            <div className="space-y-4">
              <Label>Select an affirmation</Label>
              <RadioGroup
                value={selectedAffirmation}
                onValueChange={setSelectedAffirmation}
                className="space-y-4"
              >
                {predefinedAffirmations.map((affirmation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={affirmation} id={`affirmation-${index}`} />
                    <Label htmlFor={`affirmation-${index}`}>{affirmation}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="custom-affirmation">Write your affirmation</Label>
              <Textarea
                id="custom-affirmation"
                placeholder="Enter your personal daily affirmation"
                value={customAffirmation}
                onChange={(e) => setCustomAffirmation(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Write an affirmation that resonates with your faith journey
              </p>
            </div>
          )}

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </SettingsSection>
    </SettingsDetailLayout>
  );
}