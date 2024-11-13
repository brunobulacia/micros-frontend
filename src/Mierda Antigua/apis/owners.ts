import { useAuthStore } from "@/store/auth";
import axios from "../../api/axios";

export const getOwners = async () => {
  const url = "usuarios/owners";
  return await axios.post(url, { token: useAuthStore.getState().token });
};
