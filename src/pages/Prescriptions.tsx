import { useEffect, useState } from "react";
import {
  getPrescriptions,
  deletePrescription,
} from "../services/prescriptionsapi";
import type { Prescription } from "../services/prescriptionsapi";
import PrescriptionCard from "../components/PrescriptionCard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPrescriptions(page);
        setPrescriptions(data);
      } catch (err) {
        console.error("Failed to load prescriptions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, refreshKey]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this prescription?")) return;
    await deletePrescription(id);
    setRefreshKey((k) => k + 1);
  };

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-sm">
          Loading prescriptions...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Prescriptions
          </h1>
          <div className="text-sm text-gray-500">
            Total: {prescriptions.length}
          </div>
        </div>

        {/* Data Section */}
        {prescriptions.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm shadow-sm">
            No prescriptions available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prescriptions.map((p, index) => (
              <div
                key={p.id}
                className="transition-transform duration-150 hover:-translate-y-1"
                style={{
                  animation: `fadeIn 0.3s ease ${index * 0.05}s both`,
                }}
              >
                <PrescriptionCard
                  prescription={p}
                  onDelete={handleDelete}
                  onEdit={(id) =>
                    alert(`Edit functionality coming soon for ${id}`)
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {prescriptions.length > 0 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm font-medium">
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-md border text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border-gray-200 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
