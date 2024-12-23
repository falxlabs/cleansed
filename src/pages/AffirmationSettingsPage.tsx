import { DailyAffirmationSettings } from "@/components/settings/DailyAffirmationSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";

export default function AffirmationSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <DailyAffirmationSettings />
    </div>
  );
}