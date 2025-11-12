import api from "./api";

export interface Report {
  id: string;
  doctorName: string;
  patientName: string;
  medicalRecordId: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
}

// Get all reports (optionally filtered by patient)
export const getReports = async (patientId?: string): Promise<Report[]> => {
  const url = patientId ? `/reports?patientId=${patientId}` : "/reports";
  const res = await api.get(url);
  return res.data;
};

// Upload a new report (multipart/form-data)
export const uploadReport = async (formData: FormData) => {
  const res = await api.post("/reports", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete a report
export const deleteReport = async (id: string) => {
  const res = await api.delete(`/reports/${id}`);
  return res.data;
};

// Fetch a single report
export const getReportById = async (id: string): Promise<Report> => {
  const res = await api.get(`/reports/${id}`);
  return res.data;
};
