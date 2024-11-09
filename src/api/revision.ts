import axios from "./axios";

interface crearRevisionData {
  token: string;
  interno: string;
  detalle: string;
  estado: string;
  proximaFecha: string;
}

export const revisionRequest = async (data: crearRevisionData) =>
  axios.post("/revisionesTecnicas/crear", data);
