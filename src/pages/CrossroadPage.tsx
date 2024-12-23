import { Mascot } from "@/components/dashboard/Mascot";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const CrossroadPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Mascot 
        message="What's on your mind? I'm here to help you navigate through your thoughts and feelings."
        context="crossroad"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={cn(
          "p-6 cursor-pointer hover:shadow-lg transition-shadow",
          "bg-white rounded-3xl border-2 border-gray-200"
        )} onClick={() => navigate("/reflection")}>
          <h2 className="text-xl font-bold mb-2">Reflect on Past Temptation</h2>
          <p className="text-gray-600">Process and learn from your experiences with temptation.</p>
        </Card>
        <Card className={cn(
          "p-6 cursor-pointer hover:shadow-lg transition-shadow",
          "bg-white rounded-3xl border-2 border-gray-200"
        )} onClick={() => navigate("/journal")}>
          <h2 className="text-xl font-bold mb-2">Journal Your Thoughts</h2>
          <p className="text-gray-600">Write freely about your feelings, experiences, and journey.</p>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => navigate("/")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CrossroadPage;