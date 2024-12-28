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
    <nav className="flex flex-col shrink-0 bg-white border-t border-gray-200 shadow-lg w-full">
      {!user && (
        <div className="border-b border-gray-200">
          <SampleDataAlert />
        </div>
      )}
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto w-full px-4 sm:px-6">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center",
              "w-[calc(100%/3-1rem)] sm:w-24 py-2", // Responsive width
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
}