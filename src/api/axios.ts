const API_URL = "https://proyecto-micros.onrender.com";

//APIS DE BRUNO
// const API_URL = "http://localhost:3000";

import axios from "axios";
import { useAuthStore } from "../store/auth";

const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`);
    config.headers.set("Content-Type", "application/json");
  }
  return config;
});

export default authApi;
