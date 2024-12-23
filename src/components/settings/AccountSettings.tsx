import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsSection } from "./SettingsSection";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function AccountSettings() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, age')
          .single();
        
        if (profile) {
          setFirstName(profile.first_name || "");
          setAge(profile.age?.toString() || "");
        }
      }
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        age: age ? parseInt(age) : null,
      })
      .eq('id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save profile data. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully.",
    });
  };

  return (
    <SettingsSection title="Account Settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="bg-muted"
          />
          <p className="text-sm text-muted-foreground">
            Email cannot be changed
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </SettingsSection>
  );
}