export interface MicroData {
  placa: string;
  interno: string;
  modelo: string;
  año: number;
  seguro: string;
  linea: string;
  token: string;
}

// api.ts
import axios from "./axios";

export const crearMicro = async (microData: MicroData) => {
  try {
    const response = await axios.post("/micros/crear", microData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el micro:", error);
    throw error;
  }
};
