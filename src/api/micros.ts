import axios from "./axios";

export const getMicros = async (token: string, id_linea: number) => axios.post("/micros", { token, linea: id_linea });