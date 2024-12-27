import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import DashboardPage from "@/pages/DashboardPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import SettingsPage from "@/pages/SettingsPage";
import SettingsAccountPage from "@/pages/SettingsAccountPage";
import SettingsAppearancePage from "@/pages/SettingsAppearancePage";
import SettingsNotificationsPage from "@/pages/SettingsNotificationsPage";
import SettingsPrivacyPage from "@/pages/SettingsPrivacyPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/account" element={<SettingsAccountPage />} />
        <Route path="/settings/appearance" element={<SettingsAppearancePage />} />
        <Route
          path="/settings/notifications"
          element={<SettingsNotificationsPage />}
        />
        <Route path="/settings/privacy" element={<SettingsPrivacyPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;