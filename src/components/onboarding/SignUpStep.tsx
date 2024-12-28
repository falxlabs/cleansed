import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SignUpStepProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export function SignUpStep({ email, onEmailChange }: SignUpStepProps) {
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!email) {
      return "Email is required";
    }
    
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., user@example.com)";
    }
    
    return "";
  };

  const handleEmailChange = (value: string) => {
    const validationError = validateEmail(value);
    setError(validationError);
    onEmailChange(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Almost Done!</h2>
      
      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="Email Address"
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
        <p className="text-sm text-muted-foreground text-center">
          We'll never share your email with anyone else
        </p>
      </div>
    </div>
  );
}