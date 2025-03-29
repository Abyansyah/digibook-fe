import authClient from './authClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postPublish = async (payload: FormData): Promise<any> => {
  try {
    const response = await authClient.post('/published', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPublish = async (slug: string) => {
  try {
    const response = await authClient.get(`/published/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updatePublish = async (id: string, data: any) => {
  try {
    const response = await authClient.post(`/published/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPublish = async () => {
  try {
    const response = await authClient.get('/published');
    return response.data;
  } catch (error) {
    throw error;
  }
};
