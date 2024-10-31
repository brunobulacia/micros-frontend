import { useAuthStore } from "@/store/auth";
// api.ts
import axios from "./axios";
import { MicroData } from "@/types";

export const crearMicro = async (microData: MicroData) => {
  try {
    console.log(microData)
    const response = await axios.post("/micros/crear",
      { 
        ...microData,
        token: useAuthStore.getState().token
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el micro:", error);
    throw error;
  }
};
