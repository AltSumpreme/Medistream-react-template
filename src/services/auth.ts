import { api, setAuthToken } from '../api/client';

export async function login(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password });
  const data = res.data;
  // If backend returns access token, use it; otherwise expect cookie-only
  if (data?.access_token) setAuthToken(data.access_token);
  return data;
}

export async function signup(firstName: string, lastName: string, email: string, password: string, phone: string) {
  const res = await api.post('/auth/signup', { firstName, lastName, email, password, phone });
  const data = res.data;
  if (data?.access_token) setAuthToken(data.access_token);
  return data;
}

export async function verify() {
  // Verify using bearer header if token is present
  const res = await api.post('/auth/verify');
  return res.data; // expect { user_id, role, ... }
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } finally {
    setAuthToken(null);
  }
}
