import axios from "./axios";
import { useAuthStore } from "@/store/auth";

export const programarMantenimiento = async (data: any) => {
  const url = "/mantenimiento/crear";
  return await axios.post(url, {
    ...data,
    token: useAuthStore.getState().token,
  });
};

export const getMantenimientos = async () =>
  axios.post("/mantenimiento/linea", { token: useAuthStore.getState().token });
