import { Input } from "@/components/ui/input";

interface PersonalInfoStepProps {
  firstName: string;
  setFirstName: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  step: number;
}

export const PersonalInfoStep = ({
  firstName,
  setFirstName,
  age,
  setAge,
  email,
  setEmail,
  step,
}: PersonalInfoStepProps) => {
  if (step === 3) {
    return (
      <Input
        type="text"
        placeholder="Enter your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="text-lg"
      />
    );
  }

  if (step === 4) {
    return (
      <Input
        type="number"
        min="13"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="text-lg"
      />
    );
  }

  if (step === 5) {
    return (
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-lg"
      />
    );
  }

  return null;
};