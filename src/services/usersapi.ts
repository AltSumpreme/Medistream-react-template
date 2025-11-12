import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  specialization?: string;
  createdAt: string;
}

// Fetch all users (optionally filter by role)
export const getUsers = async (role?: string): Promise<User[]> => {
  const url = role ? `/users?role=${role}` : "/users";
  const res = await api.get(url);
  return res.data;
};

// Fetch doctors by specialization
export const getDoctorsBySpecialization = async (specialization: string): Promise<User[]> => {
  const res = await api.get(`/users/doctors?specialization=${specialization}`);
  return res.data;
};

// Get single user by ID
export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// Update user info
export const updateUser = async (id: string, data: Partial<User>) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

// Promote patient → doctor
export const promoteUserToDoctor = async (
  id: string,
  specialization: string
) => {
  const res = await api.post(`/users/${id}/promote`, { specialization });
  return res.data;
};
