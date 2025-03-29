import authClient from './authClient';

export const fetchBooks = async (params: { search?: string; book_category?: string; page?: number }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.book_category) queryParams.append('book_categories', params.book_category);
    if (params.page) queryParams.append('page', String(params.page));

    const response = await authClient.get(`/books?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBookDetail = async (slug: string) => {
  try {
    const response = await authClient.get(`/books/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComments = async (slug: string) => {
  try {
    const response = await authClient.get(`/books/${slug}/reviews`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const readBook = async (slug?: string, last_page?: number) => {
  try {
    const response = await authClient.post(`/reading-session`, {
      slug,
      last_page,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postComment = async (slug: string, comment: string, rating: number) => {
  try {
    const response = await authClient.post(`/books/${slug}/reviews`, {
      comment,
      rating,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await authClient.get('/book-categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRelateBook = async (slug: string) => {
  try {
    const response = await authClient.get(`/books/${slug}/related`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
