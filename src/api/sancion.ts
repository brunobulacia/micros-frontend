import axios from "./axios";

interface SancionData {
  chofer: string;
  token: string;
  monto: number;
  estado: string;
  descripcion: string;
  tipo: string;
}

export const crearSancion = async (data: SancionData) =>
  axios.post("/sanciones/crearFicha", data);

export const getSanciones = async (token: string) =>
  axios.post("/sanciones/linea", {
    token: token,
  });
