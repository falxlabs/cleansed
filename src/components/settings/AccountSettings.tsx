import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsSection } from "./SettingsSection";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function AccountSettings() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [age, setAge] = useState("");

  useEffect(() => {
    const savedFirstName = localStorage.getItem("userFirstName");
    const savedAge = localStorage.getItem("userAge");
    if (savedFirstName) {
      setFirstName(savedFirstName);
    }
    if (savedAge) {
      setAge(savedAge);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userFirstName", firstName);
    localStorage.setItem("userAge", age);
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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