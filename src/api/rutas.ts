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
    
export const crearParada = async (data) => {

    return await axios.post("/paradas/crear", 
        {
            data
        }
    )
}