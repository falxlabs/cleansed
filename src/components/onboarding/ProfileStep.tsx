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
        <Input
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
        />
        
        <Input
          id="age"
          type="number"
          placeholder="Age"
          min="0"
          max="120"
          value={age}
          onChange={(e) => onAgeChange(e.target.value)}
        />
      </div>
    </div>
  );
}