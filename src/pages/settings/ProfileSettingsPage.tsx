import { AccountSettings } from "@/components/settings/AccountSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsDetailLayout } from "@/components/settings/SettingsDetailLayout";

export default function ProfileSettingsPage() {
  return (
    <SettingsDetailLayout>
      <SettingsHeader />
      <AccountSettings />
    </SettingsDetailLayout>
  );
}