/* // MODULO PARA MANEJAR ESTADOS GLOBALES Y GUARDAR EL TOKEN EN EL LOCAL STORAGE

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
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData = {
  nombre: string;
  apellido: string;
  correo: string;
  sexo: string;
  fecha_de_nacimiento: string;
  direccion: string;
  carnet: string;
};

type State = {
  token: string;
  isAuth: boolean;
  userData: UserData | null; // Nuevo estado para almacenar los datos del usuario
};

type Actions = {
  setToken: (token: string) => void;
  setUserData: (userData: UserData) => void; // Nueva acción para almacenar los datos del usuario
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      isAuth: false,
      userData: null,
      setToken: (token: string) =>
        set((state) => ({
          token,
          isAuth: true,
        })),
      setUserData: (userData: UserData) =>
        set((state) => ({
          userData,
        })),
      logout: () =>
        set((state) => ({
          token: "",
          isAuth: false,
          userData: null, // Limpiar los datos del usuario al hacer logout
        })),
    }),
    {
      name: "auth", // Nombre para guardar en localStorage
    }
  )
);
