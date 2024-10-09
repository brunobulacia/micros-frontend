import axios from "./axios";

export const choferRes = async (token: string) => axios.post("/usuarios/choferes", 
    {
        token: token
    }
);
