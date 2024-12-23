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
import { BottomNav } from "./components/navigation/BottomNav";
import { DesktopNav } from "./components/navigation/DesktopNav";
import { Toaster } from "@/components/ui/toaster";

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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/daily-checkin" element={<DailyCheckinPage />} />
            <Route path="/crossroad" element={<CrossroadPage />} />
            <Route path="/past-temptation" element={<PastTemptationPage />} />
            <Route path="/reflection" element={<ReflectionPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
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