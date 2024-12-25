import { Home, PenTool, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { SampleDataAlert } from "@/components/auth/SampleDataAlert";

export function DesktopNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: PenTool, label: "Journal", path: "/journal" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isSettingsActive = location.pathname.startsWith('/settings');

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r bg-background p-6">
      <div className="flex flex-col justify-between h-full w-full">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-2xl font-extrabold text-duo-500">Cleansed</h1>
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/settings' 
              ? isSettingsActive 
              : (location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/"));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold transition-all duration-200 hover:bg-duo-50 ${
                  isActive 
                    ? "bg-duo-50 text-duo-500" 
                    : "text-gray-600 hover:text-duo-500"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-duo-500" : ""}`} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
        
        {!user && (
          <div className="mb-6">
            <SampleDataAlert />
          </div>
        )}
      </div>
    </nav>
  );
}