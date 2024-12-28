import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileStepProps {
  firstName: string;
  age: string;
  onFirstNameChange: (value: string) => void;
  onAgeChange: (value: string) => void;
}

export function ProfileStep({
  firstName,
  age,
  onFirstNameChange,
  onAgeChange,
}: ProfileStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Tell Us About Yourself</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            min="0"
            max="120"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}