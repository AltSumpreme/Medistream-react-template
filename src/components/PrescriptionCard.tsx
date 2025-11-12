import type { Prescription } from "../services/prescriptionsapi";

interface PrescriptionCardProps {
  prescription: Prescription;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function PrescriptionCard({
  prescription,
  onDelete,
  onEdit,
}: PrescriptionCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-gray-800">
          {prescription.medication || "Untitled Prescription"}
        </h3>
        <p className="text-sm text-gray-600">
          Doctor: {prescription.doctorName || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          Dosage: {prescription.dosage || "-"}
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onEdit(prescription.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </button>
        <button
          onClick={() => onDelete(prescription.id)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
