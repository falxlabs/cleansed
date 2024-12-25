import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shouldShowCheckIn } from "@/utils/checkInUtils";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MascotProps {
  message: string;
  className?: string;
  onCheckIn?: () => void;
  showCheckInButton?: boolean;
}

const getUserFirstName = () => {
  return localStorage.getItem("userFirstName") || "";
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    setIsTyping(true);
    setShowCursor(true);

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
        return true;
      }
      return false;
    };

    const typingInterval = setInterval(() => {
      const hasMoreCharacters = typeNextCharacter();
      if (!hasMoreCharacters) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <span className="inline-block">
      {displayedText.split('').map((char, index) => (
        <span
          key={index}
          className={cn(
            "inline-block",
            "opacity-0 animate-[fadeIn_0.1s_ease-in-out_forwards]"
          )}
          style={{ 
            animationDelay: `${index * 0.05}s`,
          }}
        >
          {char}
        </span>
      ))}
      {showCursor && (
        <span 
          className={cn(
            "inline-block w-0.5 h-4 bg-duo-500 ml-0.5 relative top-0.5",
            "animate-[blink_1s_step-start_infinite]"
          )}
        />
      )}
    </span>
  );
};

export function Mascot({ 
  message, 
  className, 
  onCheckIn, 
  showCheckInButton = false 
}: MascotProps) {
  const location = useLocation();
  const { user } = useAuth();
  const isDashboard = location.pathname === "/dashboard";
  const shouldShow = shouldShowCheckIn();
  const firstName = getUserFirstName();
  const personalizedGreeting = firstName ? `Hey ${firstName}! ` : "Hey! ";
  const [hasCompletedCheckIn, setHasCompletedCheckIn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const checkExistingCheckIn = async () => {
      if (!user) return;

      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      const { data: existingCheckIn } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('entry_type', 'check-in')
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString())
        .maybeSingle();

      setHasCompletedCheckIn(!!existingCheckIn);
    };

    checkExistingCheckIn();
  }, [user]);

  const displayMessage = (isDashboard && shouldShow && user && !hasCompletedCheckIn)
    ? `${personalizedGreeting}Time for your daily moment of reflection.`
    : hasCompletedCheckIn
    ? `${personalizedGreeting}Thank you for taking time to reflect today. Keep growing stronger! 🌱`
    : message;

  return (
    <Card className={cn(
      "p-6 relative overflow-hidden",
      "bg-white rounded-3xl border-2 border-gray-200 shadow-lg",
      className
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div 
            className={cn(
              "w-16 h-16 rounded-2xl bg-duo-100 flex items-center justify-center",
              isAnimating && "animate-bounce"
            )}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            <span className="text-3xl">🕊️</span>
          </div>
          <div className="text-lg font-bold leading-relaxed text-gray-800">
            <TypewriterText text={displayMessage} />
          </div>
        </div>
        
        {showCheckInButton && isDashboard && shouldShow && user && !hasCompletedCheckIn && onCheckIn && (
          <Button
            onClick={() => {
              setIsAnimating(true);
              onCheckIn();
            }}
            className="bg-duo-100 text-duo-800 hover:bg-duo-200 w-full"
          >
            Daily Check-in
          </Button>
        )}
      </div>
    </Card>
  );
}