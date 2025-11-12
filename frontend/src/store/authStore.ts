import axios from "axios";
import { create } from "zustand";

interface AuthState {
  email: string | null;
  token: string | null;
  admin: boolean;
  logout: () => void;
  signin: (token: string, email: string) => void;
  checkAdmin: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  token: null,
  admin: false,

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    set({ token: null, email: null, admin: false });
  },

  signin: (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    set({ token, email });
  },

  checkAdmin: async (email: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/admin/getUserType?email=${email}`);

      set({ admin: res.data.isAdmin === true });
    } catch (error) {
      console.error("Error checking admin role:", error);
      set({ admin: false });
    }
  },
}));
