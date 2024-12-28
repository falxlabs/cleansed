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
    <nav className="flex flex-col shrink-0 bg-white border-t border-gray-100 shadow-lg w-full">
      {!user && (
        <div className="border-b border-gray-100">
          <SampleDataAlert />
        </div>
      )}
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto w-full px-4 sm:px-6">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || (path === "/dashboard" && location.pathname === "/");
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                "w-[calc(100%/3-1rem)] sm:w-24 py-1.5",
                "transition-all duration-300 transform",
                isActive ? (
                  "text-duo-500 translate-y-[-2px]"
                ) : (
                  "text-gray-400 hover:text-duo-400"
                )
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-0.5",
                isActive && "animate-float"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-bold"
              )}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}