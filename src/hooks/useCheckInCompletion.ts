import { useNavigate } from "react-router-dom";
import { useCheckIn } from "./useCheckIn";
import { TemptationType } from "@/types/database";

interface CheckInData {
  mood: number[];
  description: string;
  selectedTemptation: TemptationType | "";
  temptationLevel: number[];
  selectedStatement: string;
}

export function useCheckInCompletion() {
  const navigate = useNavigate();
  const { handleCheckIn } = useCheckIn();

  const handleComplete = async (data: CheckInData) => {
    const success = await handleCheckIn(data);
    if (success) {
      navigate("/dashboard");
    }
  };

  return { handleComplete };
}