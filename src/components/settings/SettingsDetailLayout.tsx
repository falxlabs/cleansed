import { ReactNode } from "react";

interface SettingsDetailLayoutProps {
  children: ReactNode;
}

export function SettingsDetailLayout({ children }: SettingsDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}