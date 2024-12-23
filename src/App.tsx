import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import DailyCheckinPage from "./pages/DailyCheckinPage";
import CrossroadPage from "./pages/CrossroadPage";
import PastTemptationPage from "./pages/PastTemptationPage";
import ReflectionPage from "./pages/ReflectionPage";
import JournalPage from "./pages/JournalPage";
import SettingsPage from "./pages/SettingsPage";
import AchievementsPage from "./pages/AchievementsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import { BottomNav } from "./components/navigation/BottomNav";
import { DesktopNav } from "./components/navigation/DesktopNav";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const showNav = !['/', '/onboarding', '/signin'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {showNav && <DesktopNav />}
      <div className={`${showNav ? "md:flex" : ""} min-h-[calc(100vh-4rem)]`}>
        {showNav && <div className="hidden md:block w-64 shrink-0" />}
        <main className={`${showNav ? "md:flex-1" : ""} px-4 pb-24 md:pb-6 md:px-6`}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/daily-checkin" element={<ProtectedRoute><DailyCheckinPage /></ProtectedRoute>} />
            <Route path="/crossroad" element={<ProtectedRoute><CrossroadPage /></ProtectedRoute>} />
            <Route path="/past-temptation" element={<ProtectedRoute><PastTemptationPage /></ProtectedRoute>} />
            <Route path="/reflection" element={<ProtectedRoute><ReflectionPage /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/settings/profile" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
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