import authClient from './authClient';

export const fetchUser = async () => {
  const response = await authClient.get('/users');
  return response.data;
};

export const updateUser = async (payload: FormData) => {
  const response = await authClient.post('/users', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
