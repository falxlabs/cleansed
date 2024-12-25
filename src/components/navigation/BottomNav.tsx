import { Home, Book, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/AuthProvider";
import { SampleDataAlert } from "@/components/auth/SampleDataAlert";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const hideNavRoutes = ['/crossroad', '/reflection', '/past-temptation'];
  if (!isMobile || hideNavRoutes.includes(location.pathname)) return null;

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Book, label: "Journal", path: "/journal" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      {!user && (
        <div className="border-b border-gray-200">
          <SampleDataAlert />
        </div>
      )}
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto px-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center w-20",
              "text-gray-400 hover:text-duo-500 transition-colors",
              (location.pathname === path || (path === "/dashboard" && location.pathname === "/")) && "text-duo-500 font-bold"
            )}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};