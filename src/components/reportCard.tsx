import type { Report } from "../services/Reportsapi";

interface ReportCardProps {
  report: Report;
  onDelete?: (id: string) => void;
}

export default function ReportCard({ report, onDelete }: ReportCardProps) {
  const date = report.uploadedAt
    ? new Date(report.uploadedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex justify-between items-start hover:shadow-md transition">
      <div className="space-y-1">
        <div className="text-gray-900 font-semibold text-base truncate">
          {report.fileName || "Unnamed Report"}
        </div>

        <div className="text-sm text-gray-700">
          Doctor: <span className="font-medium">{report.doctorName || "-"}</span>
        </div>
        <div className="text-sm text-gray-700">
          Patient:{" "}
          <span className="font-medium">{report.patientName || "-"}</span>
        </div>
        <div className="text-sm text-gray-700">
          Record ID:{" "}
          <span className="font-medium">{report.medicalRecordId || "-"}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">Uploaded: {date}</div>
      </div>

      <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
        <a
          href={report.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View / Download
        </a>
        <button
          onClick={() => onDelete?.(report.id)}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
