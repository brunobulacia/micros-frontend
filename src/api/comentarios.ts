import axios from "./axios";

export const getComentarios = async (token: string, id_linea: number) =>
  axios.post("/comentarios/linea", { token: token, id_linea: id_linea });

interface crearComentarioData {
  id_linea: number;
  titulo: string;
  descripcion: string;
  tipo_comentario: string;
  token: string;
}

export const crearComentario = async (data: crearComentarioData) =>
  axios.post("/comentarios/crear", data);
