import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import DailyCheckinPage from "./pages/DailyCheckinPage";
import CrossroadPage from "./pages/CrossroadPage";
import PastTemptationPage from "./pages/PastTemptationPage";
import ReflectionPage from "./pages/ReflectionPage";
import JournalPage from "./pages/JournalPage";
import SettingsPage from "./pages/SettingsPage";
import AchievementsPage from "./pages/AchievementsPage";
import { BottomNav } from "./components/navigation/BottomNav";
import { DesktopNav } from "./components/navigation/DesktopNav";
import { Toaster } from "@/components/ui/toaster";
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import DailyCheckInSettingsPage from "./pages/settings/DailyCheckInSettingsPage";
import AffirmationSettingsPage from "./pages/settings/AffirmationSettingsPage";
import TemptationSettingsPage from "./pages/settings/TemptationSettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";
import SupportSettingsPage from "./pages/settings/SupportSettingsPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <DesktopNav />
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/daily-checkin" element={<DailyCheckinPage />} />
            <Route path="/crossroad" element={<CrossroadPage />} />
            <Route path="/past-temptation" element={<PastTemptationPage />} />
            <Route path="/reflection" element={<ReflectionPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/settings/profile" element={<ProfileSettingsPage />} />
            <Route path="/settings/daily-checkin" element={<DailyCheckInSettingsPage />} />
            <Route path="/settings/affirmation" element={<AffirmationSettingsPage />} />
            <Route path="/settings/temptation" element={<TemptationSettingsPage />} />
            <Route path="/settings/notifications" element={<NotificationsSettingsPage />} />
            <Route path="/settings/support" element={<SupportSettingsPage />} />
          </Routes>
        </main>
      </div>
      <BottomNav />
      <Toaster />
    </Router>
  );
}

export default App;