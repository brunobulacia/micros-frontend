import { TurnoData } from "@/types";
import axios from "./axios";

type FormData = {
  token: string;
  chofer: string;
  fecha: string;
};
export const cargaHoraria = async (data: FormData) =>
  axios.post("/turnos/cargaChofer", data);

export const turnos = async (token: string) => {
  const url = "/turnos";
  return await axios.post(url, { token });
};

export const finalizarTurno = async (id_turno: string, token: string) => {
  const url = "/turnos/finalizar";
  return await axios.post(url, { token, uuid: id_turno });
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

interface CrearHorario {
  token: string;
  hora_salida: string;
  hora_llegada: string;
}

export const crearHorario = async (data: CrearHorario) =>
  axios.post("/turnos/crearHorario", data);

export const getHorarios = async (token: string) =>
  axios.post("/turnos/horarios", { token });
