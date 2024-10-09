import axios from "./axios";

export const choferRes = async () => axios.get("/usuarios/choferes");
