import { api } from '../api/client';

export async function getRecordsByPatientId(patientId: string, page = 1, limit = 10) {
  const res = await api.get(`/medical-records/patient/${patientId}?page=${page}&limit=${limit}`);
  return Array.isArray(res.data) ? res.data : res.data.records ?? [];
}

export async function getRecordById(id: string) {
  const res = await api.get(`/medical-records/${id}`);
  return res.data.record ?? res.data;
}
