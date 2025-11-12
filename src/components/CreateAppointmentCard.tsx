import { useState } from "react";
import { createAppointment } from "../services/appointmentapi";

interface CreateAppointmentCardProps {
  onCreated: () => void;
}

export default function CreateAppointmentCard({ onCreated }: CreateAppointmentCardProps) {
  const [form, setForm] = useState({
    doctorId: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
    appointmentType: "CONSULTATION",
    mode: "In-Person",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.doctorId || !form.appointmentDate || !form.startTime || !form.endTime) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        doctorId: form.doctorId,
        userId: localStorage.getItem("userId"),
        appointmentDate: new Date(form.appointmentDate).toISOString(),
        appointmentType: form.appointmentType,
        startTime: form.startTime,
        endTime: form.endTime,
        mode: form.mode,
        notes: form.notes,
      };
      await createAppointment(payload);
      setForm({
        doctorId: "",
        appointmentDate: "",
        startTime: "",
        endTime: "",
        appointmentType: "CONSULTATION",
        mode: "In-Person",
        notes: "",
      });
      onCreated();
    } catch (err) {
      console.error(err);
      alert("Failed to create appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Create New Appointment
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Doctor ID"
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <input
          type="date"
          value={form.appointmentDate}
          onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <select
          value={form.appointmentType}
          onChange={(e) => setForm({ ...form, appointmentType: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="CONSULTATION">Consultation</option>
          <option value="FOLLOWUP">Follow-up</option>
          <option value="CHECKUP">Checkup</option>
          <option value="EMERGENCY">Emergency</option>
        </select>

        <select
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="In-Person">In-Person</option>
          <option value="Online">Online</option>
        </select>

        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="sm:col-span-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          {submitting ? "Creating..." : "Create Appointment"}
        </button>
      </form>
    </div>
  );
}
