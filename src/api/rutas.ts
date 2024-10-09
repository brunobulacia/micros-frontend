import { Stop } from "@/types";
import axios from "./axios";

export const rutasLineasResponse = async () => axios.post("/rutas/lineas");

export const rutas = async (linea: number) => axios.post("/rutas", 
    {
        id_linea: linea
    }
);

export const paradas = async (id_ruta: number) => {
    const url = `/rutas/paradas/${id_ruta}`
    return await axios.get(url)
}
    
export const crearParada = async (stop: Stop, ruta: number) => {

    return await axios.post("rutas/paradas/crear", 
        {
            nombre: stop.nombre_parada,
            orden: stop.orden_parada,
            latitud: stop.coordenadas.lat,
            longitud: stop.coordenadas.lon,
            ruta
        }
    )
}