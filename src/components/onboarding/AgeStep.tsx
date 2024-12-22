import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./types";

interface AgeStepProps {
  form: UseFormReturn<OnboardingFormData>;
}

export function AgeStep({ form }: AgeStepProps) {
  return (
    <FormField
      control={form.control}
      name="age"
      render={({ field }) => (
        <FormItem>
          <Label htmlFor="age">Age</Label>
          <FormControl>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}