import { useState, useEffect } from "react";
import { createAppointment, getDoctorsBySpecialization } from "../services/appointmentapi";

interface CreateAppointmentCardProps {
  onCreated: () => void;
}

interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  specialization: string;
}

export default function CreateAppointmentCard({ onCreated }: CreateAppointmentCardProps) {
  const [form, setForm] = useState({
    specialization: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    duration: 30,
    location: "",
    appointmentType: "CONSULTATION" as 'CONSULTATION' | 'FOLLOWUP' | 'CHECKUP' | 'EMERGENCY',
    mode: "In-Person" as 'ONLINE' | 'In-Person',
    notes: "",
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Psychiatry",
    "General Practice",
    "Surgery",
    "Radiology",
    "Oncology",
  ];

  useEffect(() => {
    if (form.specialization) {
      fetchDoctors(form.specialization);
    } else {
      setDoctors([]);
      setForm(prev => ({ ...prev, doctorId: "" }));
    }
  }, [form.specialization]);

  const fetchDoctors = async (specialization: string) => {
    try {
      setLoadingDoctors(true);
      const response = await getDoctorsBySpecialization(specialization);
      setDoctors(Array.isArray(response) ? response : response.doctors || []);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.doctorId || !form.appointmentDate || !form.appointmentTime || !form.location) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const patientId = localStorage.getItem("userId") || "";
      const payload = {
        patientId,
        doctorId: form.doctorId,
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        duration: form.duration,
        location: form.location,
        appointmentType: form.appointmentType,
        mode: form.mode,
        specialization: form.specialization,
        notes: form.notes,
      };
      await createAppointment(payload);
      setForm({
        specialization: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        duration: 30,
        location: "",
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
        <select
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value, doctorId: "" })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>

        <select
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          required
          disabled={!form.specialization || loadingDoctors}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm disabled:opacity-50"
        >
          <option value="">
            {loadingDoctors ? "Loading doctors..." : "Select Doctor"}
          </option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              Dr. {doc.first_name} {doc.last_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.appointmentDate}
          onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <input
          type="time"
          value={form.appointmentTime}
          onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 30 })}
          min="15"
          max="240"
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <select
          value={form.appointmentType}
          onChange={(e) => setForm({ ...form, appointmentType: e.target.value as any })}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="CONSULTATION">Consultation</option>
          <option value="FOLLOWUP">Follow-up</option>
          <option value="CHECKUP">Checkup</option>
          <option value="EMERGENCY">Emergency</option>
        </select>

        <select
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value as any })}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="In-Person">In-Person</option>
          <option value="ONLINE">Online</option>
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
          className="sm:col-span-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Appointment"}
        </button>
      </form>
    </div>
  );
}
