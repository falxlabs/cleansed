import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SignUpStepProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export function SignUpStep({ email, onEmailChange }: SignUpStepProps) {
  const [error, setError] = useState("");

  const handleEmailChange = (value: string) => {
    setError("");
    if (!value) {
      setError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address");
    }
    onEmailChange(value);
  };

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
          onChange={(e) => handleEmailChange(e.target.value)}
          required
          className={error ? "border-red-500" : ""}
        />
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          We'll never share your email with anyone else
        </p>
      </div>
    </div>
  );
}