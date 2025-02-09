import { create } from 'zustand';
import { fetchCategories, fetchDetailEvent, fetchEvents } from '@/services/eventApi';

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  isFree: boolean;
  start_date: string;
  end_date: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  participants: number;
  imageUrl: string;
  is_registration?: boolean;
  participants_count: number;
  registeredCount: number;
  start_time: string;
  end_time: string;
  event_overview: string;
  location: string;
  registration_deadline: number | 0;
}

export interface EventCategory {
  id: string;
  name: string;
}

interface EventStore {
  events: Event[];
  eventCategory: EventCategory[];
  eventDetail: Event | null;
  loading: boolean;
  loadingDetail: boolean;
  loadingEventCategory: boolean;
  fetchEvents: (params?: { search?: string; event_category?: string; status?: string; per_page?: number }) => Promise<void>;
  fetchEventCategory: () => Promise<void>;
  fetchEventDetail: (slug: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  eventCategory: [],
  eventDetail: null,
  loading: false,
  loadingEventCategory: false,
  loadingDetail: false,

  fetchEvents: async (params) => {
    set({ loading: true });
    try {
      const { data } = await fetchEvents(params);
      set({ events: data?.list, loading: false });
    } catch (error) {
      console.error('Failed to fetch events:', error);
      set({ loading: false });
    }
  },
  fetchEventCategory: async () => {
    set({ loadingEventCategory: true });
    try {
      const { data } = await fetchCategories();
      set({ eventCategory: data, loadingEventCategory: false });
    } catch (error) {
      console.error('Failed to fetch event categories:', error);
      set({ loadingEventCategory: false });
    }
  },
  fetchEventDetail: async (slug) => {
    set({ loadingDetail: true });
    try {
      const { data } = await fetchDetailEvent(slug);
      set({ eventDetail: data, loadingDetail: false });
    } catch (error) {
      console.error('Failed to fetch event detail:', error);
      set({ loadingDetail: false });
    }
  },
}));
