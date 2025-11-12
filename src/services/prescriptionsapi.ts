import api from "./api";

export interface Prescription {
  id: string;
  doctorName: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  notes?: string;
  issuedAt: string;
  medicalRecordId?: string;
}

// Fetch paginated prescriptions
export const getPrescriptions = async (page = 1, limit = 10): Promise<Prescription[]> => {
  const res = await api.get(`/prescriptions?page=${page}&limit=${limit}`);
  return res.data;
};

// Create new prescription
export const createPrescription = async (data: Partial<Prescription>) => {
  const res = await api.post("/prescriptions", data);
  return res.data;
};

// Update prescription
export const updatePrescription = async (id: string, data: Partial<Prescription>) => {
  const res = await api.put(`/prescriptions/${id}`, data);
  return res.data;
};

// Delete prescription
export const deletePrescription = async (id: string) => {
  const res = await api.delete(`/prescriptions/${id}`);
  return res.data;
};
