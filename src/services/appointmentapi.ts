import api from "./api";

// Fetch all appointments (for current user)
export const getAppointments = async () => {
  const res = await api.get("/appointments");
  return res.data;
};

// Create a new appointment
export const createAppointment = async (data: {
  doctorId: string;
  appointmentDate: string;
  reason?: string;
}) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

// Update (reschedule or modify) an appointment
export const updateAppointment = async (
  id: string,
  data: { appointmentDate?: string; status?: string }
) => {
  const res = await api.put(`/appointments/${id}`, data);
  return res.data;
};

// Cancel an appointment
export const cancelAppointment = async (id: string) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};
