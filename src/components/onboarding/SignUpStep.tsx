import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SignUpStepProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

export function SignUpStep({ email, password, onEmailChange, onPasswordChange }: SignUpStepProps) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    }
    
    if (password.length < 12) {
      return "Password must be at least 12 characters long";
    }
    
    return "";
  };

  const validateConfirmPassword = (confirmPwd: string, password: string) => {
    if (!confirmPwd) {
      return "Please confirm your password";
    }
    
    if (confirmPwd !== password) {
      return "Passwords do not match";
    }
    
    return "";
  };

  const handleEmailChange = (value: string) => {
    const validationError = validateEmail(value);
    setEmailError(validationError);
    onEmailChange(value);
  };

  const handlePasswordChange = (value: string) => {
    const validationError = validatePassword(value);
    setPasswordError(validationError);
    
    // Also validate confirm password when password changes
    const confirmValidationError = validateConfirmPassword(confirmPassword, value);
    setConfirmPasswordError(confirmValidationError);
    
    onPasswordChange(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    const validationError = validateConfirmPassword(value, password);
    setConfirmPasswordError(validationError);
    setConfirmPassword(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Almost Done!</h2>
      <p className="text-center text-muted-foreground">
        Sign up to save your progress and settings
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && (
            <p className="text-sm text-red-500">
              {emailError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password (min. 12 characters)"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            className={passwordError ? "border-red-500" : ""}
          />
          {passwordError && (
            <p className="text-sm text-red-500">
              {passwordError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            required
            className={confirmPasswordError ? "border-red-500" : ""}
          />
          {confirmPasswordError && (
            <p className="text-sm text-red-500">
              {confirmPasswordError}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            This password will be used both for login and to encrypt your sensitive data
          </p>
        </div>
      </div>
    </div>
  );
}