import axios from "./axios";

export const rutasLineasResponse = async () => axios.get("/rutas/lineas");
export const rutas = async (linea) => axios.get("/rutas", linea);
