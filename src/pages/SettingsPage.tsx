import { AccountSettings } from "@/components/settings/AccountSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { NotificationsSettings } from "@/components/settings/NotificationsSettings";
import { SupportSettings } from "@/components/settings/SupportSettings";
import { DailyAffirmationSettings } from "@/components/settings/DailyAffirmationSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <SettingsHeader />
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="affirmation">Affirmation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <AccountSettings />
        </TabsContent>
        <TabsContent value="affirmation">
          <DailyAffirmationSettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>
        <TabsContent value="support">
          <SupportSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}