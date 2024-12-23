import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import Index from "./pages/Index";
import CrossroadPage from "./pages/CrossroadPage";
import ReflectionPage from "./pages/ReflectionPage";
import JournalPage from "./pages/JournalPage";
import PastTemptationPage from "./pages/PastTemptationPage";
import SettingsPage from "./pages/SettingsPage";
import { BottomNav } from "./components/navigation/BottomNav";

const queryClient = new QueryClient();

export default () => {
  // TODO: Replace with actual auth check
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding") === "true";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <OnboardingPage />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <Index />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/crossroad"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <CrossroadPage />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/reflection"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <ReflectionPage />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/journal"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <JournalPage />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/past-temptation"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <PastTemptationPage />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <SettingsPage />
                  ) : (
                    <Navigate to="/onboarding" replace />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};