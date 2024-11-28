import axios from "./axios";
import { useAuthStore } from "@/store/auth";

export const getMensajes = async () => {
  const url = "/chat";
  return await axios.post(url, {
    token: useAuthStore.getState().token,
  });
};