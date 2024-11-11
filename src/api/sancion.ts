import axios from "./axios";

interface SancionData {
  chofer: string;
  token: string;
  monto: number;
  estado: string;
  descripcion: string;
  tipo: string;
}

interface tipoSancion {
  token: string;
  tipo: string;
}

export const crearSancion = async (data: SancionData) =>
  axios.post("/sanciones/crearFicha", data);

export const getSanciones = async (token: string) =>
  axios.post("/sanciones/linea", {
    token: token,
  });

export const crearTipoSancion = async (data: tipoSancion) =>
  axios.post("/sanciones/crear", data);

export const getTiposSancion = async (token: string) =>
  axios.post("/sanciones/", { token });
