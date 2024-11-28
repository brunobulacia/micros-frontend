import axios from "./axios";

export const getNotificaciones = async (token: string) =>
  axios.post("/notificaciones/linea", { token });

interface NotificacionData {
  token: string;
  tipo: string;
  contenido: string;
}

export const crearNotificacion = async (data: NotificacionData) =>
  axios.post("/notificaciones/crear", data);

interface eliminarNotificacionData {
  token: string;
  id_notificacion: string;
}

export const eliminarNotificacion = async (data: eliminarNotificacionData) =>
  axios.post("/notificaciones/eliminar", data);
