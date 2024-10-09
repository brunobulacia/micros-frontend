import axios from "./axios";

export const rutasLineasResponse = async () => axios.post("/rutas/lineas");
