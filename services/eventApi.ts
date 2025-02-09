import authClient from './authClient';

export const fetchEvents = async (params?: { search?: string; event_category?: string; status?: string; per_page?: number }) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append('search', params.search);
    if (params?.event_category) queryParams.append('event_category', params.event_category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.per_page) queryParams.append('per_page', String(params.per_page));

    const response = await authClient.get(`/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await authClient.get('/event-categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchDetailEvent = async (slug: string) => {
  try {
    const response = await authClient.get(`/events/${slug}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching detail event:', error);
    throw error;
  }
};

export const registEvent = async (eventId?: number) => {
  try {
    const response = await authClient.post(`/events`, { event_id: eventId });
    return response?.data;
  } catch (error) {
    console.error('Error fetching register event:', error);
    throw error;
  }
};
