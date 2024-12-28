import { Calendar } from "@/components/ui/calendar";

interface DateStepProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const DateStep = ({ date, onDateChange }: DateStepProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
      
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={{ after: new Date() }}
          className="rounded-md border"
        />
      </div>
    </>
  );
};