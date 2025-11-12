import { useEffect, useState } from "react";
import { getMedicalRecords } from "../services/medicalRecordsapi";
import type { MedicalRecord } from "../services/medicalRecordsapi";
import RecordCard from "../components/RecordCard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getMedicalRecords();
        setRecords(data);
      } catch (err) {
        console.error("Failed to load medical records:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-sm">
          Loading medical records...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your complete medical history and documents
          </p>
        </div>

        {/* Records */}
        {records.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 shadow-sm">
            No records found.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {records.map((record, i) => (
              <div
                key={record.id}
                style={{
                  animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
                }}
              >
                <RecordCard record={record} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
