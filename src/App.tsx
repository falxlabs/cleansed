import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import DailyCheckinPage from "./pages/DailyCheckinPage";
import CrossroadPage from "./pages/CrossroadPage";
import PastTemptationPage from "./pages/PastTemptationPage";
import ReflectionPage from "./pages/ReflectionPage";
import NewJournalPage from "./pages/NewJournalPage";
import SettingsPage from "./pages/SettingsPage";
import AchievementsPage from "./pages/AchievementsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import DailyCheckInSettingsPage from "./pages/settings/DailyCheckInSettingsPage";
import AffirmationSettingsPage from "./pages/settings/AffirmationSettingsPage";
import TemptationSettingsPage from "./pages/settings/TemptationSettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";
import SupportSettingsPage from "./pages/settings/SupportSettingsPage";
import { BottomNav } from "./components/navigation/BottomNav";
import { DesktopNav } from "./components/navigation/DesktopNav";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const publicRoutes = ['/', '/onboarding', '/signin'];
  const showNav = !publicRoutes.includes(location.pathname);
  const useFullHeight = !publicRoutes.includes(location.pathname) && !location.pathname.includes('/settings');

  return (
    <div className="bg-[#F5F5F5]">
      {showNav && <DesktopNav />}
      <div className={showNav ? "md:flex" : ""}>
        {showNav && <div className="hidden md:block w-64 shrink-0" />}
        <main className={`${showNav ? "" : ""} ${useFullHeight ? "min-h-[calc(100vh-4rem)]" : ""}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/signin" element={<SignInPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/daily-checkin" element={<ProtectedRoute><DailyCheckinPage /></ProtectedRoute>} />
            <Route path="/crossroad" element={<ProtectedRoute><CrossroadPage /></ProtectedRoute>} />
            <Route path="/past-temptation" element={<ProtectedRoute><PastTemptationPage /></ProtectedRoute>} />
            <Route path="/reflection" element={<ProtectedRoute><ReflectionPage /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><NewJournalPage /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />

            {/* Settings Routes */}
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/settings/profile" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/daily-checkin" element={<ProtectedRoute><DailyCheckInSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/affirmation" element={<ProtectedRoute><AffirmationSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/temptation" element={<ProtectedRoute><TemptationSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/notifications" element={<ProtectedRoute><NotificationsSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/support" element={<ProtectedRoute><SupportSettingsPage /></ProtectedRoute>} />
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
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;