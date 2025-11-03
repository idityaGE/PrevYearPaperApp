import { create } from "zustand";

interface AuthState {
  email: string | null;
  token: string | null;
  // Setters
  logout: () => void;
  signin: (token: string, email:string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  token: null,

  logout:()=> {
    localStorage.removeItem("token");
    set({token:null});
    set({email:null});
  },
  signin: (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem('email', email);
    set({
      email,
      token
    })
  }
}));
