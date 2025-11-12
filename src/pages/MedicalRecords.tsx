import { useEffect, useMemo, useState } from "react";
import {
  getMedicalRecords,
  deleteMedicalRecord,
} from "../services/medicalRecordsapi";
import type { MedicalRecord } from "../services/medicalRecordsapi";
import RecordCard from "../components/RecordCard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const data = await getMedicalRecords();
        setRecords(data);
      } catch (err) {
        console.error("Failed to load medical records:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [refreshKey]);

  const recordsByDate = useMemo(() => {
    const map: Record<string, MedicalRecord[]> = {};
    for (const r of records) {
      const key = new Date(r.createdAt).toISOString().split("T")[0];
      if (!map[key]) map[key] = [];
      map[key].push(r);
    }
    return map;
  }, [records]);

  const filteredRecords = selectedDate
    ? recordsByDate[selectedDate] || []
    : records;

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    await deleteMedicalRecord(id);
    setRefreshKey((k) => k + 1);
  };

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-sm">
          Loading medical records...
        </div>
      </DashboardLayout>
    );

  const sortedDates = Object.keys(recordsByDate).sort((a, b) => (a > b ? -1 : 1));

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Medical Records
          </h1>
          <div className="text-sm text-gray-500">
            Total Records: {records.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timeline / Filter */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-fit">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              Records Timeline
            </h2>
            <ul className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
              {sortedDates.map((d) => (
                <li key={d}>
                  <button
                    onClick={() =>
                      setSelectedDate(selectedDate === d ? null : d)
                    }
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedDate === d
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {d} ({recordsByDate[d].length})
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm text-blue-600 hover:underline"
              >
                Show all
              </button>
            </div>
          </div>

          {/* Record List */}
          <div className="md:col-span-2 space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm shadow-sm">
                No records found{selectedDate ? ` on ${selectedDate}` : "."}
              </div>
            ) : (
              filteredRecords.map((r, i) => (
                <div
                  key={r.id}
                  className="transition-transform duration-150 hover:-translate-y-1"
                  style={{
                    animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                  }}
                >
                  <RecordCard
                    record={r}
                    onDelete={handleDelete}
                    onEdit={(id) =>
                      alert(`Edit feature coming soon for record ${id}`)
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
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
