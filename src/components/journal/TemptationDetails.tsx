import { getTemptationLevelText } from "./EntryDetailsDialog";

interface TemptationDetailsProps {
  entry: {
    type: string;
    resisted: boolean;
    level: string;
    trigger: string;
    notes: string;
    description?: string;
  };
}

export const TemptationDetails = ({ entry }: TemptationDetailsProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Type of Temptation</p>
          <p className="capitalize">{entry.type}</p>
        </div>
        
        <div className={`bg-white p-4 rounded-xl border shadow-sm ${
          entry.resisted ? "bg-green-50" : "bg-red-50"
        }`}>
          <p className="text-sm font-semibold text-primary mb-2">Outcome</p>
          <p className={`font-medium ${
            entry.resisted ? "text-green-600" : "text-red-600"
          }`}>
            {entry.resisted ? "✓ Successfully Resisted" : "✗ Gave in"}
          </p>
        </div>
      </div>

      {entry.description && (
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Description</p>
          <p className="text-gray-700">{entry.description}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-sm font-semibold text-primary mb-2">Intensity Level</p>
        <p>{getTemptationLevelText(entry.level)}</p>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-sm font-semibold text-primary mb-2">Trigger</p>
        <p className="text-gray-700">{entry.trigger || "No trigger specified"}</p>
      </div>
    </div>
  );
};