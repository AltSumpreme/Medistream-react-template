import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getAppointments,
  cancelAppointment,
  updateAppointment,
} from "../services/appointmentapi";
import AppointmentCard from "../components/AppointmentCard";
import Calendar, { toDateKey } from "../components/Calender";
import CreateAppointmentCard from "../components/CreateAppointmentCard";

interface Appointment {
  id: string;
  doctorName: string;
  specialization?: string;
  appointmentDate: string;
  status: string;
  location?: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to load appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [refreshKey]);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of appointments) {
      try {
        const d = new Date(a.appointmentDate);
        const key = toDateKey(d);
        map[key] = (map[key] || 0) + 1;
      } catch {}
    }
    return map;
  }, [appointments]);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await cancelAppointment(id);
      setRefreshKey((k) => k + 1);
    } catch {
      alert("Failed to cancel appointment");
    }
  };

  const handleReschedule = async (id: string) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD HH:MM):");
    if (!newDate) return;
    try {
      await updateAppointment(id, {
        appointmentDate: new Date(newDate).toISOString(),
      });
      setRefreshKey((k) => k + 1);
    } catch {
      alert("Failed to reschedule");
    }
  };

  const filtered = useMemo(() => {
    if (!selectedDate) return appointments;
    return appointments.filter(
      (a) => toDateKey(new Date(a.appointmentDate)) === selectedDate
    );
  }, [appointments, selectedDate]);

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-600 animate-pulse text-lg">
          Loading your appointments...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Appointments
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Manage and track your scheduled sessions.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-sm"
          >
            + New Appointment
          </button>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Panel */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Calendar
            </h2>
            <Calendar
              appointmentsByDate={appointmentsByDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {/* Appointment List */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              {selectedDate
                ? `Appointments on ${selectedDate}`
                : "Your Appointments"}
            </h2>

            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm text-gray-500">
                <p className="text-xl font-semibold mb-2">
                  No Appointments Yet
                </p>
                <p className="text-sm">
                  You currently don’t have any scheduled sessions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((a, index) => (
                  <AppointmentCard
                    key={a.id}
                    id={a.id}
                    doctorName={a.doctorName}
                    specialization={a.specialization}
                    appointmentDate={a.appointmentDate}
                    status={a.status}
                    location={a.location || "Clinic Room 101"}
                    onCancel={handleCancel}
                    onReschedule={handleReschedule}
                    style={{
                      animation: `fadeIn 0.4s ease ${index * 0.08}s both`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Appointment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative border border-gray-200 animate-fadeIn">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Create New Appointment
            </h2>
            <CreateAppointmentCard
              onCreated={() => {
                setShowCreateModal(false);
                setRefreshKey((k) => k + 1);
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
