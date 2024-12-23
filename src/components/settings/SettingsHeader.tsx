import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SettingsHeaderProps {
  title?: string;
}

export function SettingsHeader({ title = "Settings" }: SettingsHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsDetailPage = location.pathname !== '/settings';

  return (
    <div className="flex items-center gap-4 mb-6">
      {isSettingsDetailPage && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}