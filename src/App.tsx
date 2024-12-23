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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default () => {
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
                !isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : hasCompletedOnboarding ? (
                  <Navigate to="/home" replace />
                ) : (
                  <OnboardingPage />
                )
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/crossroad"
              element={
                <ProtectedRoute>
                  <CrossroadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reflection"
              element={
                <ProtectedRoute>
                  <ReflectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <JournalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/past-temptation"
              element={
                <ProtectedRoute>
                  <PastTemptationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {isAuthenticated && hasCompletedOnboarding && <BottomNav />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};