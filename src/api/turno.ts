import { TurnoData } from "@/types";
import axios from "./axios";

export const turnos = async (token: string, id_linea: number) => {
    const url = "/turnos";
    return await axios.post(url, { token, id_linea });
}

export const finalizarTurno = async (id_horario: string, token: string) => {
    const url = "/turnos/finalizar";
    return await axios.post(url, { token, uuid: id_horario });
}

export const crearTurno = async (turnoData: TurnoData, token: string) => {
    const url = "/turnos/iniciar";
    console.log(turnoData)
    return await axios.post(url, { token, ...turnoData });
}