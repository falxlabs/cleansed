import { Calendar } from "@/components/ui/calendar";

interface DateSelectionStepProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const DateSelectionStep = ({ date, onDateSelect }: DateSelectionStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Select the Date</h3>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          disabled={{ after: new Date() }}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};