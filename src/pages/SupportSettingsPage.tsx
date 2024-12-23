import { SupportSettings } from "@/components/settings/SupportSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";

export default function SupportSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <SupportSettings />
    </div>
  );
}