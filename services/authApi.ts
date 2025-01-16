import authClient from './authClient';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginApi = async (values: LoginPayload) => {
  const response = await authClient.post('/auth/login', values);
  return response.data;
};

export const logoutApi = async () => {
  const response = await authClient.post('/auth/logout');
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await authClient.get('/auth/me');
  return response.data;
};

export const registerApi = (formData: { name: string; email: string; password: string; password_confirmation: string }) => {
  return authClient.post('/auth/register', formData);
};
