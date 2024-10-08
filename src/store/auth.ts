import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  token: string;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
};
export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      isAuth: false,
      setToken: (token: string) =>
        set((state) => ({
          token,
          isAuth: true,
        })),
      logout: () =>
        set((state) => ({
          token: "",
          isAuth: false,
        })),
    }),
    {
      name: "auth",
    }
  )
);
