import { Button } from "@/components/ui/button";
import { SettingsSection } from "./SettingsSection";

export function SupportSettings() {
  return (
    <SettingsSection title="Support">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Need Help?</h3>
          <p className="text-muted-foreground">
            We're here to support you on your journey. If you need assistance or have any questions, please don't hesitate to reach out.
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full" variant="outline">
            Contact Support
          </Button>
          <Button className="w-full" variant="outline">
            View FAQ
          </Button>
          <Button className="w-full" variant="outline">
            Report an Issue
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
}