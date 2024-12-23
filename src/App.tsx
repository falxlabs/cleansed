import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import DailyCheckinPage from "./pages/DailyCheckinPage";
import CrossroadPage from "./pages/CrossroadPage";
import PastTemptationPage from "./pages/PastTemptationPage";
import ReflectionPage from "./pages/ReflectionPage";
import JournalPage from "./pages/JournalPage";
import SettingsPage from "./pages/SettingsPage";
import AchievementsPage from "./pages/AchievementsPage";
import SignInPage from "./pages/SignInPage";
import { BottomNav } from "./components/navigation/BottomNav";
import { DesktopNav } from "./components/navigation/DesktopNav";
import { Toaster } from "@/components/ui/toaster";
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import DailyCheckInSettingsPage from "./pages/settings/DailyCheckInSettingsPage";
import AffirmationSettingsPage from "./pages/settings/AffirmationSettingsPage";
import TemptationSettingsPage from "./pages/settings/TemptationSettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";
import SupportSettingsPage from "./pages/settings/SupportSettingsPage";

const AppContent = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/" && location.pathname !== "/signin";

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {showNav && <DesktopNav />}
      <div className={`${showNav ? "md:flex" : ""} min-h-[calc(100vh-4rem)]`}>
        {showNav && <div className="hidden md:block w-64 shrink-0" />}
        <main className={`${showNav ? "md:flex-1" : ""} px-4 pb-24 md:pb-6 md:px-6`}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignInPage />} />
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
      {showNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;