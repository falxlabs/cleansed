import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SignUpStepProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export function SignUpStep({ email, onEmailChange }: SignUpStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Almost Done!</h2>
      <p className="text-center text-muted-foreground">
        Sign up to save your progress and settings
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          We'll never share your email with anyone else
        </p>
      </div>
    </div>
  );
}