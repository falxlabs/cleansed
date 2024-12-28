import { Mascot } from "@/components/dashboard/Mascot";
import { CheckInContainer } from "@/components/daily-checkin/CheckInContainer";
import { CheckInStepContent } from "@/components/daily-checkin/CheckInStepContent";
import { useCheckInState } from "@/components/daily-checkin/useCheckInState";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 4;

export default function DailyCheckinPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    step,
    mood,
    setMood,
    description,
    setDescription,
    selectedTemptation,
    setSelectedTemptation,
    temptationLevel,
    setTemptationLevel,
    selectedStatement,
    setSelectedStatement,
    handleNext,
    isNextDisabled,
  } = useCheckInState();

  useEffect(() => {
    const checkExistingCheckIn = async () => {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      const { data: existingCheckIn, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('entry_type', 'check-in')
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString())
        .maybeSingle();

      if (error) {
        console.error('Error checking for existing check-in:', error);
        return;
      }

      if (existingCheckIn) {
        toast({
          title: "Check-in Already Completed",
          description: `You've already completed your daily check-in for ${format(today, 'MMMM d, yyyy')}`,
        });
        navigate('/dashboard');
      }
    };

    checkExistingCheckIn();
  }, [navigate, toast]);

  const getMascotMessage = () => {
    switch(step) {
      case 1:
        return "How are you feeling today? Let's start with your mood.";
      case 2:
        return "What type of temptation are you struggling with the most today?";
      case 3:
        return "Understanding your temptation level helps us support you better.";
      case 4:
        return "Try saying it out loud - speaking affirmations has the strongest impact";
      default:
        return "Let's do your daily check-in together!";
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="-ml-2 mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Mascot 
          message={getMascotMessage()} 
          className="mb-6"
        />

        <div className="flex items-center gap-4 mb-6">
          <Progress value={progress} className="w-full" />
        </div>
        
        <CheckInContainer
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          isNextDisabled={isNextDisabled()}
          onNext={handleNext}
        >
          <CheckInStepContent
            step={step}
            mood={mood}
            description={description}
            selectedTemptation={selectedTemptation}
            temptationLevel={temptationLevel}
            selectedStatement={selectedStatement}
            onMoodChange={setMood}
            onDescriptionChange={setDescription}
            onTemptationChange={setSelectedTemptation}
            onTemptationLevelChange={setTemptationLevel}
            onStatementChange={setSelectedStatement}
          />
        </CheckInContainer>
      </div>
    </div>
  );
}