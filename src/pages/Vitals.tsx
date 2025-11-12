import { useEffect, useState } from "react";
import { getVitals, createVital, deleteVital } from "../services/vitalsapi";
import type { Vital } from "../services/vitalsapi";
import VitalCard from "../components/VitalCard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Vitals() {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [form, setForm] = useState({
    patientName: "",
    bloodPressure: "",
    heartRate: "",
    bmi: "",
    temperature: "",
    oxygenLevel: "",
  });

  const fetchVitals = async () => {
    try {
      setLoading(true);
      const data = await getVitals();
      setVitals(data);
    } catch (err) {
      console.error("Failed to load vitals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, [refreshKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<Vital> = {
        patientName: form.patientName,
        bloodPressure: form.bloodPressure,
        heartRate: form.heartRate ? Number(form.heartRate) : undefined,
        bmi: form.bmi ? Number(form.bmi) : undefined,
        temperature: form.temperature ? Number(form.temperature) : undefined,
        oxygenLevel: form.oxygenLevel ? Number(form.oxygenLevel) : undefined,
      };

      await createVital(payload);
      setForm({
        patientName: "",
        bloodPressure: "",
        heartRate: "",
        bmi: "",
        temperature: "",
        oxygenLevel: "",
      });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to create vital record.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vital record?")) return;
    await deleteVital(id);
    setRefreshKey((k) => k + 1);
  };

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-sm">
          Loading vitals...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Vitals
          </h1>
          <div className="text-sm text-gray-500">
            Total Records: {vitals.length}
          </div>
        </div>

        {/* Add Vital Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <input
              type="text"
              placeholder="Patient Name"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              required
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Blood Pressure (e.g. 120/80)"
              value={form.bloodPressure}
              onChange={(e) =>
                setForm({ ...form, bloodPressure: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Heart Rate (BPM)"
              value={form.heartRate}
              onChange={(e) =>
                setForm({ ...form, heartRate: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="BMI"
              value={form.bmi}
              onChange={(e) => setForm({ ...form, bmi: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Temperature (°C)"
              value={form.temperature}
              onChange={(e) =>
                setForm({ ...form, temperature: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Oxygen Level (%)"
              value={form.oxygenLevel}
              onChange={(e) =>
                setForm({ ...form, oxygenLevel: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            Save Vital
          </button>
        </form>

        {/* Vitals List */}
        {vitals.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm shadow-sm">
            No vital records available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vitals.map((v, i) => (
              <div
                key={v.id}
                className="transition-transform duration-150 hover:-translate-y-1"
                style={{
                  animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                }}
              >
                <VitalCard
                  vital={v}
                  onDelete={handleDelete}
                  onEdit={(id) =>
                    alert(`Edit functionality coming soon for ${id}`)
                  }
                />
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
