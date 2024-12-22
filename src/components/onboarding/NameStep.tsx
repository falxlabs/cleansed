import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./types";

interface NameStepProps {
  form: UseFormReturn<OnboardingFormData>;
}

export function NameStep({ form }: NameStepProps) {
  return (
    <FormField
      control={form.control}
      name="first_name"
      render={({ field }) => (
        <FormItem>
          <Label htmlFor="first_name">First Name</Label>
          <FormControl>
            <Input
              id="first_name"
              placeholder="Enter your first name"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}