import { getTemptationLevelText } from "./EntryDetailsDialog";

interface TemptationDetailsProps {
  entry: {
    type: string;
    resisted: boolean;
    level: string;
    trigger: string;
    reflectionNotes: string;
    personalNotes?: string;
  };
}

export const TemptationDetails = ({ entry }: TemptationDetailsProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Type of Challenge</p>
          <p className="capitalize">{entry.type}</p>
        </div>
        
        <div className={`bg-white p-4 rounded-xl border shadow-sm ${
          entry.resisted ? "bg-green-50" : "bg-red-50"
        }`}>
          <p className="text-sm font-semibold text-primary mb-2">Outcome</p>
          <p className={`font-medium ${
            entry.resisted ? "text-green-600" : "text-red-600"
          }`}>
            {entry.resisted ? "✓ Successfully Overcome" : "✗ Need More Support"}
          </p>
        </div>
      </div>

      {entry.personalNotes && (
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Personal Notes</p>
          <p className="text-gray-700">{entry.personalNotes}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-sm font-semibold text-primary mb-2">Reflection</p>
        <p className="text-gray-700">{entry.reflectionNotes || "No reflection provided"}</p>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-sm font-semibold text-primary mb-2">Challenge Intensity</p>
        <p>{getTemptationLevelText(entry.level)}</p>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-sm font-semibold text-primary mb-2">Trigger</p>
        <p className="text-gray-700">{entry.trigger || "No trigger specified"}</p>
      </div>
    </div>
  );
};