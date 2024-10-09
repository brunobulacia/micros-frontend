import axios from "./axios";

export const rutasLineasResponse = async () => axios.get("/rutas/lineas");

export const rutas = async (linea: number) => axios.post("/rutas", 
    {
        id_linea: linea
    }
);

export const paradas = async (id_ruta: number) => axios.get("rutas/paradas", 
    {
        params: {
          id_ruta
        }
    }
)