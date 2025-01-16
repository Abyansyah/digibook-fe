import { User } from './user';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string;
  user: User | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  resetStatus: () => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}
