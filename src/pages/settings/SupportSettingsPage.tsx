import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function SupportSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <SettingsSection title="Support">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Need help?</h3>
            <p className="text-sm text-muted-foreground">
              Get in touch with our support team
            </p>
          </div>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
            <Button className="w-full" variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Live Chat
            </Button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}