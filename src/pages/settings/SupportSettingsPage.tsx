import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function SupportSettingsPage() {
  return (
    <SettingsDetailLayout>
      <SettingsHeader title="Support" />
      <SettingsSection title="Contact Us">
        <div className="space-y-6">
          <Card className="p-4">
            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Send us an email at support@example.com
                </p>
                <Button variant="link" className="px-0 mt-2">
                  Send Email
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Call us at (123) 456-7890
                </p>
                <p className="text-xs text-muted-foreground">
                  Available Monday-Friday, 9am-5pm EST
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start space-x-4">
              <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Chat with our support team in real-time
                </p>
                <Button variant="link" className="px-0 mt-2">
                  Start Chat
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </SettingsSection>
    </SettingsDetailLayout>
  );
}