import api from "./api";

export interface Vital {
  id: string;
  patientName: string;
  medicalRecordId?: string;
  bloodPressure?: string;
  heartRate?: number;
  bmi?: number;
  temperature?: number;
  oxygenLevel?: number;
  recordedAt: string;
}

// Fetch all vitals (optional patient filter)
export const getVitals = async (patientId?: string): Promise<Vital[]> => {
  const url = patientId ? `/vitals?patientId=${patientId}` : "/vitals";
  const res = await api.get(url);
  return res.data;
};

// Create a new vital record
export const createVital = async (data: Partial<Vital>) => {
  const res = await api.post("/vitals", data);
  return res.data;
};

// Update an existing vital record
export const updateVital = async (id: string, data: Partial<Vital>) => {
  const res = await api.put(`/vitals/${id}`, data);
  return res.data;
};

// Delete a vital record
export const deleteVital = async (id: string) => {
  const res = await api.delete(`/vitals/${id}`);
  return res.data;
};
