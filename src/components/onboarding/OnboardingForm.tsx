import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingProgress } from "./OnboardingProgress";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface FormData {
  firstName: string;
  age: string;
  email: string;
}

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    age: "",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const mascotMessages = {
    1: "Hi there! Let's start with your name.",
    2: "Great! Now, how old are you?",
    3: "Almost done! What's your email address?",
    4: "Please enter the verification code sent to your email.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      if (showOTP) {
        const { error } = await supabase.auth.verifyOtp({
          email: formData.email,
          token: otp,
          type: 'email',
        });

        if (error) throw error;

        toast({
          title: "Welcome aboard!",
          description: "Your account has been created successfully.",
        });
      } else if (step < 3) {
        setStep(step + 1);
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
            data: {
              first_name: formData.firstName,
              age: parseInt(formData.age),
            },
          },
        });

        if (error) {
          if (error.message.includes('rate_limit')) {
            toast({
              variant: "destructive",
              title: "Please wait",
              description: "You can request another code in a few seconds.",
            });
            return;
          }
          throw error;
        }

        setShowOTP(true);
        setStep(4);
        toast({
          title: "Verification code sent!",
          description: "Please check your email for the verification code.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium">First Name</label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Enter your first name"
              required
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Age</label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age"
              required
              min="1"
              max="120"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Verification Code</label>
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, idx) => (
                    <InputOTPSlot key={idx} {...slot} index={idx} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 p-6">
      <OnboardingProgress currentStep={step} totalSteps={4} />
      <Mascot message={mascotMessages[step as keyof typeof mascotMessages]} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderFormStep()}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {step < 3 ? "Next" : showOTP ? "Verify" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}