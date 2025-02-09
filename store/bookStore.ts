import { create } from 'zustand';
import { fetchBookDetail, fetchComments } from '@/services/bookApi';
import { books } from '@/types/book';
import { BookReviewType } from '@/types/review-books';

interface BookDetailState {
  bookDetail: books | null;
  bookReview: BookReviewType[] | null;
  loading: boolean;
  loadingReview: boolean;
  error: string | null;
  error_review: string | null;
  fetchBookDetail: (slug: string) => Promise<void>;
  fetchBookReview: (slug: string) => Promise<void>;
}

export const useBookStore = create<BookDetailState>((set) => ({
  bookDetail: null,
  bookReview: null,
  loading: false,
  loadingReview: false,
  error: null,
  error_review: null,
  fetchBookDetail: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await fetchBookDetail(slug);
      set({ bookDetail: data, loading: false, error: null });
    } catch (error) {
      console.log(error);
      set({ loading: false, error: 'Error fetching book detail' });
    }
  },
  fetchBookReview: async (slug: string) => {
    set({ loadingReview: true, error_review: null });
    try {
      const { data } = await fetchComments(slug);
      set({ bookReview: data?.list, loadingReview: false, error_review: null });
    } catch (error) {
      console.log(error);
      set({ loadingReview: false, error_review: 'Error fetching book review' });
    }
  },
}));
