import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { EmailSupport } from "@/components/support/EmailSupport";
import { TwitterSupport } from "@/components/support/TwitterSupport";

export default function SupportSettingsPage() {
  return (
    <SettingsDetailLayout>
      <SettingsHeader title="Support" />
      <SettingsSection title="Contact Us">
        <div className="space-y-6">
          <EmailSupport />
          <TwitterSupport />
        </div>
      </SettingsSection>
    </SettingsDetailLayout>
  );
}