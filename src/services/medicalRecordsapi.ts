import api from "./api";

export interface MedicalRecord {
  id: string;
  patientName: string;
  doctorName: string;
  diagnosis: string;
  createdAt: string;
  vitals?: {
    bloodPressure?: string;
    heartRate?: string;
    bmi?: string;
    weight?: string;
  };
}

// Fetch all records
export const getMedicalRecords = async (): Promise<MedicalRecord[]> => {
  const res = await api.get("/medical-records");
  return res.data;
};

// Get one record by ID
export const getMedicalRecord = async (id: string): Promise<MedicalRecord> => {
  const res = await api.get(`/medical-records/${id}`);
  return res.data;
};

// Create new record
export const createMedicalRecord = async (record: Partial<MedicalRecord>) => {
  const res = await api.post("/medical-records", record);
  return res.data;
};

// Update record
export const updateMedicalRecord = async (id: string, record: Partial<MedicalRecord>) => {
  const res = await api.put(`/medical-records/${id}`, record);
  return res.data;
};

// Delete record (soft delete)
export const deleteMedicalRecord = async (id: string) => {
  const res = await api.delete(`/medical-records/${id}`);
  return res.data;
};
