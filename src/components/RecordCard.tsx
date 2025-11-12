import { Eye } from "lucide-react";
import type { MedicalRecord } from "../services/medicalRecordsapi";

interface RecordCardProps {
  record: MedicalRecord;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function RecordCard({ record }: RecordCardProps) {
  const date = new Date(record.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-5 border border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-center gap-4">
        {/* File icon */}
        <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Record info */}
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {record.diagnosis}
          </h3>
          <p className="text-sm text-gray-600">
          {/*  {record.type || "Clinical Notes"} */}
          </p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
      </div>

      {/* Right side metadata */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
      {/*  <span>{record.fileSize || "2.4 MB"}</span> */}
        <Eye className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
}
