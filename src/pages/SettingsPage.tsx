import { AccountSettings } from "@/components/settings/AccountSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <div className="space-y-6">
        <AccountSettings />
      </div>
    </div>
  );
}