import { create } from "zustand";

interface AuthState {
  email: string | null;
  token: string | null;
  // Setters
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  setAuth: (email: string, token: string) => void;
  // Clearers
  clearEmail: () => void;
  clearToken: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  token: null,

  // Individual setters
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),

  // Combined setter
  setAuth: (email, token) => set({ email, token }),

  // Individual clearers
  clearEmail: () => set({ email: null }),
  clearToken: () => set({ token: null }),

  // Clear all auth data
  clearAuth: () => set({ email: null, token: null }),
}));
