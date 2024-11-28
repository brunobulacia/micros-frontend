import axios from "./axios";

export const getIncidentes = async (token: string, id_linea: number) =>
  axios.post("/incidentes/todos", { token: token, id_linea: id_linea });
interface CrearIncidente {
  token: string;
  descripcion: string;
  tipo: string;
  id_turno: string;
}
export const crearIncidente = async (data: CrearIncidente) =>
  axios.post("/incidentes/registrar", {
    ...data,
  });
