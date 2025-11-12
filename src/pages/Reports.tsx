import { useEffect, useState } from "react";
import {
  getReports,
  uploadReport,
  deleteReport,
} from "../services/Reportsapi";
import type { Report } from "../services/Reportsapi";
import ReportCard from "../components/reportCard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error("Failed to load reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [refreshKey]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select a file before uploading.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadReport(formData);
      setFile(null);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this report?")) return;
    await deleteReport(id);
    setRefreshKey((k) => k + 1);
  };

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-sm">
          Loading reports...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Medical Reports
          </h1>
          <div className="text-sm text-gray-500">
            Total: {reports.length}
          </div>
        </div>

        {/* Upload Section */}
        <form
          onSubmit={handleUpload}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
            >
              Upload
            </button>
          </div>
        </form>

        {/* Report List */}
        {reports.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm shadow-sm">
            No reports available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((r, i) => (
              <div
                key={r.id}
                className="transition-transform duration-150 hover:-translate-y-1"
                style={{
                  animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                }}
              >
                <ReportCard report={r} onDelete={handleDelete} />
              </div>
            ))}
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
