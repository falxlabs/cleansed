import { Mascot } from "@/components/dashboard/Mascot";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const CrossroadPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Mascot 
        message="You're at a crossroads. Take a moment to reflect on your choice."
        context="crossroad"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={cn(
          "p-6 cursor-pointer hover:shadow-lg transition-shadow",
          "bg-green-50 rounded-3xl border-2 border-green-200"
        )} onClick={() => navigate("/reflection")}>
          <h2 className="text-xl font-bold mb-2 text-green-700">Choose God</h2>
          <p className="text-green-600">Stay strong in your faith and resist temptation.</p>
        </Card>
        <Card className={cn(
          "p-6 cursor-pointer hover:shadow-lg transition-shadow",
          "bg-red-50 rounded-3xl border-2 border-red-200"
        )} onClick={() => navigate("/journal")}>
          <h2 className="text-xl font-bold mb-2 text-red-700">Fall to Sin</h2>
          <p className="text-red-600">Record your experience and learn from this moment.</p>
        </Card>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 text-center border-t border-gray-200">
        <p className="text-gray-600">Time remaining to make a choice: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};

export default CrossroadPage;