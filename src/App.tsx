import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CrossroadPage from "./pages/CrossroadPage";
import ReflectionPage from "./pages/ReflectionPage";
import JournalPage from "./pages/JournalPage";
import PastTemptationPage from "./pages/PastTemptationPage";
import SettingsPage from "./pages/SettingsPage";
import DailyCheckinPage from "./pages/DailyCheckinPage";
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import AffirmationSettingsPage from "./pages/settings/AffirmationSettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";
import SupportSettingsPage from "./pages/settings/SupportSettingsPage";
import { BottomNav } from "./components/navigation/BottomNav";

const queryClient = new QueryClient();

const LayoutWithNav = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <BottomNav />
  </>
);

export default () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutWithNav>
                <Index />
              </LayoutWithNav>
            }
          />
          <Route
            path="/crossroad"
            element={
              <LayoutWithNav>
                <CrossroadPage />
              </LayoutWithNav>
            }
          />
          <Route
            path="/reflection"
            element={
              <LayoutWithNav>
                <ReflectionPage />
              </LayoutWithNav>
            }
          />
          <Route
            path="/journal"
            element={
              <LayoutWithNav>
                <JournalPage />
              </LayoutWithNav>
            }
          />
          <Route
            path="/past-temptation"
            element={
              <LayoutWithNav>
                <PastTemptationPage />
              </LayoutWithNav>
            }
          />
          <Route
            path="/settings"
            element={
              <LayoutWithNav>
                <SettingsPage />
              </LayoutWithNav>
            }
          />
          <Route
            path="/daily-checkin"
            element={
              <LayoutWithNav>
                <DailyCheckinPage />
              </LayoutWithNav>
            }
          />
          <Route path="/settings/profile" element={<ProfileSettingsPage />} />
          <Route path="/settings/affirmation" element={<AffirmationSettingsPage />} />
          <Route path="/settings/notifications" element={<NotificationsSettingsPage />} />
          <Route path="/settings/support" element={<SupportSettingsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);