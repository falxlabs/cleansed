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
      <div className="space-y-2 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/settings' 
            ? isSettingsActive 
            : location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                isActive ? "bg-accent" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}