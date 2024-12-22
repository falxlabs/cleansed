import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/dashboard/Mascot";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full space-y-6 p-6">
        <Mascot
          message="Welcome to Cleansed! Your companion in the journey towards spiritual purity."
          className="mb-6"
        />
        
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Together, we'll help you track, reflect, and overcome temptations through prayer,
            scripture, and daily accountability. Your journey to spiritual growth starts here.
          </p>
          
          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() => navigate("/onboarding")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Splash;