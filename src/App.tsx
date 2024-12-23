import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/navigation/BottomNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import DashboardPage from "@/pages/DashboardPage";
import JournalPage from "@/pages/JournalPage";
import SettingsPage from "@/pages/SettingsPage";
import SignInPage from "@/pages/SignInPage";
import { useIsMobile } from "@/hooks/use-mobile";

function App() {
  const isMobile = useIsMobile();

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <DesktopNav />
        <main className={`${!isMobile ? "md:pl-64" : ""}`}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </main>
        <BottomNav />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;