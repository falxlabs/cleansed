import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import AffirmationSettingsPage from "./pages/AffirmationSettingsPage";
import NotificationsSettingsPage from "./pages/NotificationsSettingsPage";
import SupportSettingsPage from "./pages/SupportSettingsPage";
import HomePage from "./pages/HomePage"; // Example of an existing import
import NotFoundPage from "./pages/NotFoundPage"; // Example of an existing import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/profile" element={<ProfileSettingsPage />} />
        <Route path="/settings/affirmation" element={<AffirmationSettingsPage />} />
        <Route path="/settings/notifications" element={<NotificationsSettingsPage />} />
        <Route path="/settings/support" element={<SupportSettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
