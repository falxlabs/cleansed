import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CheckInHeaderProps {
  progress: number;
}

export function CheckInHeader({ progress }: CheckInHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-4 sticky top-0 bg-[#F5F5F5] py-2 z-10">
      <Button
        variant="ghost"
        className="shrink-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Progress value={progress} className="flex-1" />
    </div>
  );
}