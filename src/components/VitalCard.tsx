import type { Vital } from "../services/vitalsapi";

interface VitalCardProps {
  vital: Vital;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function VitalCard({ vital, onEdit, onDelete }: VitalCardProps) {
  const date = vital.recordedAt
    ? new Date(vital.recordedAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex justify-between items-start hover:shadow-md transition">
      <div className="space-y-1">
        <div className="text-base font-semibold text-gray-800">
          {vital.patientName}
        </div>

        {vital.medicalRecordId && (
          <div className="text-sm text-gray-600">
            Record ID:{" "}
            <span className="font-medium">{vital.medicalRecordId}</span>
          </div>
        )}

        <div className="text-sm text-gray-700 space-y-0.5 mt-2">
          {vital.bloodPressure && (
            <p>Blood Pressure: {vital.bloodPressure}</p>
          )}
          {vital.heartRate && <p>Heart Rate: {vital.heartRate} BPM</p>}
          {vital.bmi && <p>BMI: {vital.bmi}</p>}
          {vital.temperature && <p>Temperature: {vital.temperature} °C</p>}
          {vital.oxygenLevel && <p>Oxygen: {vital.oxygenLevel}%</p>}
        </div>

        <div className="text-xs text-gray-500 mt-2">Recorded: {date}</div>
      </div>

      <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
        <button
          onClick={() => onEdit?.(vital.id)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(vital.id)}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
