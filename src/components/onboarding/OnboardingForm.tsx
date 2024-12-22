import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingProgress } from "./OnboardingProgress";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    // Add storage event listener for cross-tab communication
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'supabase.auth.token') {
        checkSession();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const mascotMessages = {
    1: "Hi there! Let's start with your name.",
    2: "Great! Now, how old are you?",
    3: "Almost done! What's your email address?",
    4: "Please check your email and click the magic link we sent you to complete the signup process!",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      if (step < 3) {
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
              description: "You can request another link in a few seconds.",
            });
            return;
          }
          throw error;
        }

        setStep(4);
        toast({
          title: "Magic link sent!",
          description: "Please check your email and click the link to complete signup.",
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
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              We've sent you a magic link to complete your signup. 
              Please check your email and click the link.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Didn't receive the email? Click to try again
            </Button>
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
        {step < 4 && (
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {step < 3 ? "Next" : "Sign Up"}
          </Button>
        )}
      </form>
    </div>
  );
}