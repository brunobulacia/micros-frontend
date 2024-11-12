import { TurnoData } from "@/types";
import axios from "./axios";

export const turnos = async (token: string) => {
  const url = "/turnos";
  return await axios.post(url, { token });
};

export const finalizarTurno = async (id_horario: string, token: string) => {
  const url = "/turnos/finalizar";
  return await axios.post(url, { token, uuid: id_horario });
};

export const crearTurno = async (turnoData: TurnoData, token: string) => {
  const url = "/turnos/iniciar";
  console.log(turnoData);
  return await axios.post(url, { token, ...turnoData });
};

export const frecuenciaMicros = async (
  token: string,
  partida: string,
  frecuencia: number
) => {
  try {
    const response = await axios.post("/turnos/frecuencia", {
      token,
      partida,
      frecuencia,
    });
    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};
