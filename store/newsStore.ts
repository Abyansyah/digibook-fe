import { create } from 'zustand';
import { NewsArticle } from '@/types/news';
import { detailNews, fetchNews, fetchNewsBanner } from '@/services/newsApi';

type NewsState = {
  news: NewsArticle[];
  newsBanner: NewsArticle[];
  newsDetail: NewsArticle | null;
  loading: boolean;
  loadingBanner: boolean;
  loadingDetail: boolean;
  fetchNews: (params?: { search?: string; category?: string; per_page?: number }) => Promise<void>;
  fetchNewsBanner: () => Promise<void>;
  fetchNewsDetail: (slug: string) => Promise<void>;
};

export const useNewsStore = create<NewsState>((set) => ({
  news: [],
  newsBanner: [],
  newsDetail: null,
  loading: false,
  loadingBanner: false,
  loadingDetail: false,
  fetchNews: async (params) => {
    set({ loading: true });
    try {
      const { list } = await fetchNews(params);
      set({ news: list, loading: false });
    } catch (error) {
      console.error('Error fetching news:', error);
      set({ loading: false });
    }
  },
  fetchNewsBanner: async () => {
    set({ loadingBanner: true });
    try {
      const { list } = await fetchNewsBanner();
      set({ newsBanner: list, loadingBanner: false });
    } catch (error) {
      console.error('Error fetching news:', error);
      set({ loadingBanner: false });
    }
  },
  fetchNewsDetail: async (slug) => {
    set({ loadingDetail: true });
    try {
      const detail = await detailNews(slug);
      set({ newsDetail: detail, loadingDetail: false });
    } catch (error) {
      console.error('Error fetching news detail:', error);
      set({ loadingDetail: false });
    }
  },
}));
