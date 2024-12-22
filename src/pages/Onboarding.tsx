import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Mascot } from "@/components/dashboard/Mascot";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NameStep } from "@/components/onboarding/NameStep";
import { AgeStep } from "@/components/onboarding/AgeStep";
import { AccountStep } from "@/components/onboarding/AccountStep";
import { OnboardingFormData } from "@/components/onboarding/types";

const TOTAL_STEPS = 3;

const OnboardingMessages = {
  1: "Welcome! Let's get to know each other better. What's your name?",
  2: "Great! And how old are you?",
  3: "Finally, let's set up your account. You can use your email or sign in with Google.",
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<OnboardingFormData>({
    defaultValues: {
      first_name: "",
      age: 0,
      email: "",
      password: "",
    },
  });

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleEmailSignUp = async (data: OnboardingFormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            age: data.age,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem creating your account.",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem signing in with Google.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg space-y-6 p-6">
        <OnboardingProgress currentStep={step} totalSteps={TOTAL_STEPS} />
        
        <Mascot message={OnboardingMessages[step as keyof typeof OnboardingMessages]} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEmailSignUp)} className="space-y-4">
            {step === 1 && <NameStep form={form} />}
            {step === 2 && <AgeStep form={form} />}
            {step === 3 && <AccountStep form={form} onGoogleSignIn={handleGoogleSignIn} />}

            {step !== 3 && (
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
}