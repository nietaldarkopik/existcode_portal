import { create } from "zustand";
import type { AdminUser } from "@existcode/types";

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: AdminUser | null;
  status: AuthStatus;
  setUser: (user: AdminUser | null) => void;
  setStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status })
}));
