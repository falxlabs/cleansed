import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

function App() {
  return (
    <Router>
      <div className="flex">
        <DesktopNav />
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/" element={<Index />} />
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
      <BottomNav />
      <Toaster />
    </Router>
  );
}

export default App;