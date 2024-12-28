import { ReactNode } from "react";

interface SettingsDetailLayoutProps {
  children: ReactNode;
}

export function SettingsDetailLayout({ children }: SettingsDetailLayoutProps) {
  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}