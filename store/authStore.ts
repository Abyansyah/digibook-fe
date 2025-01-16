import { AuthState } from '@/types/auth-state';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutApi, fetchUserProfile } from '@/services/authApi';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: false,
      error: '',
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null, user: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      resetStatus: () => set({ loading: false, error: '' }),
      fetchUser: async () => {
        set({ loading: true, error: '' });
        try {
          const { data } = await fetchUserProfile();
          set({ user: data.user });
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Terjadi kesalahan tidak diketahui');
          set({ error: error.message || 'Gagal mendapatkan data pengguna.' });
          set({ user: null, token: null });
          Cookies.remove('authToken');
        } finally {
          set({ loading: false });
        }
      },
      logout: async () => {
        set({ loading: true, error: '' });
        try {
          await logoutApi();
          set({ token: null, user: null });
          Cookies.remove('authToken');
          toast.success('Logout berhasil.');
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Terjadi kesalahan tidak diketahui');
          set({ error: error.message || 'Logout gagal. Coba lagi.' });
          toast.error(error.message || 'Logout gagal. Coba lagi.');
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
