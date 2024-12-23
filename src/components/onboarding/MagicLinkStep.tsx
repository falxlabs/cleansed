import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function MagicLinkStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Mail className="h-8 w-8 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold">Check your email</h2>
      
      <div className="space-y-2">
        <p className="text-muted-foreground">
          We've sent you a magic link to complete your signup.
        </p>
        <p className="text-muted-foreground">
          Click the link in your email to continue to the dashboard.
        </p>
      </div>
    </div>
  );
}