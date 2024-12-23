import { Home, PenTool, Award, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export function DesktopNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: PenTool, label: "Journal", path: "/journal" },
    { icon: Award, label: "Achievements", path: "/achievements" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isSettingsActive = location.pathname.startsWith('/settings');

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r bg-background p-6">
      <div className="flex flex-col w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-cleansed-600 tracking-tight">
            cleansed
          </h1>
        </div>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/settings' 
              ? isSettingsActive 
              : location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-all hover:bg-cleansed-50 hover:text-cleansed-600 ${
                  isActive 
                    ? "bg-cleansed-50 text-cleansed-600" 
                    : "text-gray-600"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}