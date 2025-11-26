import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "@/lib/config";

interface AuthState {
  email: string | null;
  token: string | null;
  admin: boolean;
  logout: () => void;
  signin: (token: string, email: string) => Promise<void>;
  checkAdmin: () => Promise<void>;
}

// Initialize from localStorage
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getInitialEmail = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("email");
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  email: getInitialEmail(),
  token: getInitialToken(),
  admin: false,

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    set({ token: null, email: null, admin: false });
  },

  signin: async (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    set({ token, email });

    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/admin/getUserType?email=${email}`
      );
      set({ admin: res.data.isAdmin === true });
    } catch (error) {
      console.error("Error checking admin role:", error);
      set({ admin: false });
    }
  },

  checkAdmin: async () => {
    const { email } = useAuthStore.getState();
    if (!email) return;

    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/admin/getUserType?email=${email}`
      );
      set({ admin: res.data.isAdmin === true });
    } catch (error) {
      console.error("Error checking admin role:", error);
      set({ admin: false });
    }
  },
}));
