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
    <>
      {!user && (
        <div className="fixed top-0 left-0 right-0 px-4 z-50">
          <div className="py-2 bg-[#F5F5F5]">
            <SampleDataAlert />
          </div>
        </div>
      )}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 h-20 px-4 shadow-lg">
        <div className="flex justify-around items-center h-full max-w-lg mx-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center justify-center w-20 h-full",
                "text-gray-400 hover:text-duo-500 transition-colors",
                (location.pathname === path || (path === "/dashboard" && location.pathname === "/")) && "text-duo-500 font-bold"
              )}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};