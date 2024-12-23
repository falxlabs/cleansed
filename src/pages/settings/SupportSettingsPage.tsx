import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";

export default function SupportSettingsPage() {
  return (
    <SettingsDetailLayout>
      <SettingsHeader />
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Support</h2>
        <p>If you need assistance, please reach out to our support team.</p>
        <p>You can contact us via email at support@example.com or call us at (123) 456-7890.</p>
        <p>For FAQs, please visit our help center.</p>
      </div>
    </SettingsDetailLayout>
  );
}
