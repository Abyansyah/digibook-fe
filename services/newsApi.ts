import authClient from './authClient';

export const fetchNews = async (params?: { search?: string; category?: string; per_page?: number }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.per_page) queryParams.append('per_page', String(params.per_page));

    const response = await authClient.get(`/news?${queryParams.toString()}`);
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNewsBanner = async () => {
  const response = await authClient.patch('/news/banner');
  return response.data?.data;
};

export const detailNews = async (slug: string) => {
  const response = await authClient.get(`/news/${slug}`);
  return response.data?.data;
};
