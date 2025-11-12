import type { MedicalRecord } from "../services/medicalRecordsapi";

interface RecordCardProps {
  record: MedicalRecord;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function RecordCard({ record, onEdit, onDelete }: RecordCardProps) {
  const date = new Date(record.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex justify-between items-start hover:shadow-md transition">
      <div className="space-y-1">
        <div className="text-base font-semibold text-gray-800">
          Diagnosis: {record.diagnosis}
        </div>
        <div className="text-sm text-gray-700">
          Doctor: <span className="font-medium">{record.doctorName}</span>
        </div>
        <div className="text-sm text-gray-700">
          Patient: <span className="font-medium">{record.patientName}</span>
        </div>

        {record.vitals && (
          <div className="text-sm text-gray-700 mt-2 space-y-0.5">
            {record.vitals.bloodPressure && (
              <p>Blood Pressure: {record.vitals.bloodPressure}</p>
            )}
            {record.vitals.heartRate && (
              <p>Heart Rate: {record.vitals.heartRate} BPM</p>
            )}
            {record.vitals.bmi && <p>BMI: {record.vitals.bmi}</p>}
            {record.vitals.weight && <p>Weight: {record.vitals.weight} kg</p>}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">Created: {date}</p>
      </div>

      <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
        <button
          onClick={() => onEdit?.(record.id)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(record.id)}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
