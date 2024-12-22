import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./types";

interface AccountStepProps {
  form: UseFormReturn<OnboardingFormData>;
  onGoogleSignIn: () => void;
  onEmailSignUp: () => void;
}

export function AccountStep({ form, onGoogleSignIn, onEmailSignUp }: AccountStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-full"
        onClick={onEmailSignUp}
      >
        Sign up with Email
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogleSignIn}
      >
        Sign in with Google
      </Button>
    </div>
  );
}