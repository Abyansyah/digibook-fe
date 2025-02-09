import { UserForm } from '@/types/user';
import authClient from './authClient';

export const fetchUser = async () => {
  const response = await authClient.get('/users');
  return response.data;
};

export const updateUser = async (data: UserForm) => {
  const response = await authClient.put('/users', data);
  return response.data;
};
