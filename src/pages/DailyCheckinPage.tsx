import { Mascot } from "@/components/dashboard/Mascot";
import { CheckInContainer } from "@/components/daily-checkin/CheckInContainer";
import { CheckInStepContent } from "@/components/daily-checkin/CheckInStepContent";
import { useCheckInState } from "@/components/daily-checkin/useCheckInState";

const TOTAL_STEPS = 4;

export default function DailyCheckinPage() {
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

  const getMascotMessage = () => {
    switch(step) {
      case 1:
        return "How are you feeling today? Let's start with your mood.";
      case 2:
        return "What challenges are you facing? I'm here to support you.";
      case 3:
        return "Understanding your temptation level helps us support you better.";
      case 4:
        return "Let's end with your daily affirmation. You're doing great!";
      default:
        return "Let's do your daily check-in together!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Mascot 
          message={getMascotMessage()} 
          className="mb-6"
        />
        
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