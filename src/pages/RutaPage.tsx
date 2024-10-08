"use client"; // Marca el componente como compatible con rendering del cliente

import { useEffect, useState } from "react";
import { initMap, dibujarParadas } from '../lib/map'; // Asegúrate de importar correctamente las funciones del archivo donde se encuentran
import { OctagonMinus, Trash2 } from 'lucide-react'
import { crearParada, eliminarParada, paradas } from "@/api/rutas";
import { useLocation } from "react-router-dom";
import { Stop } from "../types"
import { useAuthStore } from "@/store/auth";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode"


const StopCard = ({ stop, role }: { stop: Stop, role: string}) => {
    const {token} = useAuthStore()
    return (
      <div className="border rounded-lg p-4 mb-4 flex items-center w-full lg:w-5/6 bg-white">
        <div className="flex items-center">
        <OctagonMinus className="w-17px h-17px mr-10" />
          <p className="font-bold text-xl">{stop.nombre_parada}</p>
        </div>
        { role === "Operador" ? (
        <button className="flex h-10 w-10 rounded-md ml-auto bg-white items-center justify-items-center hover:bg-red-500" onClick={ () => { handleDeleteConfirmation(stop, token) }}> 
            <Trash2 className="h-10 w-10 rounded-md text-2xl bg-white hover:bg-red-500 hover:text-white"/>
        </button>
        ) : null }   
      </div>
    );
  };
  const handleDeleteConfirmation = async (stop: Stop, token: string) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este chofer?");
    
    if (isConfirmed) {
      await DeleteStop(stop, token);
    }
  };
const DeleteStop = async (stop: Stop, token: string) => {
    const id_parada = stop.id_parada
    try {
        if(id_parada){
            await eliminarParada(id_parada, token)
            alert("Parada eliminada con exito")
            window.location.reload()
        } else {
            console.error("No se pudo obtener el uuid de la parada")
        }
    } catch (error) {
        console.error(error)
    }

}

const CreateStopForm = () => {
    const { token } = useAuthStore();
    const location = useLocation()
    const { id_ruta } = location.state

    const { register, handleSubmit } = useForm({
        defaultValues: {
        nombre: "",
        orden: "",
        ruta: "",
        latitud: "",
        longitud: ""
        },
    });
    
    const onSubmit = async (data) => {
        try {
            data.token = token
            
            const stop: Stop = {
                id_parada: null,
                nombre_parada: data.nombre,
                orden_parada: Number(data.orden),
                coordenadas: {
                    lon: Number(data.longitud),
                    lat: Number(data.latitud)
                },
                token: token
            }
            await crearParada(stop, id_ruta)

            alert("Parada creada con exito")
            window.location.reload();

        }
        catch (error) {
            alert("Error al crear parada")
            console.error(error)
        }
    }
    return (
        <>
            <h2 className="text-2xl font-bold mb-4 mt-10">CREAR PARADA</h2>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md w-[100%] border-2 border-gray-950 mt-5"
            >
            <div className="w-full md:w-full px-2 mb-4 bg">
                <label
                    htmlFor="nombre"
                    className="text-gray-700 dark:text-gray-300 text-lg"
                >
                    Nombre
                </label>
                <input
                    id="nombre"
                    {...register("nombre")}
                    placeholder="Ingresa el nombre de la parada"
                    className="dark:bg-gray-700 dark:text-white text-base w-full md:w-full mt-2 p-2"
                />
            </div>
            <div className="w-full md:w-full px-2 mb-4">
                <label
                    htmlFor="orden"
                    className="text-gray-700 dark:text-gray-300 text-lg"
                >
                    Orden
                </label>
                <input
                    id="orden"
                    {...register("orden")}
                    placeholder="Ingresa el orden de la parada"
                    className="dark:bg-gray-700 dark:text-white text-base w-full md:w-full mt-2 p-2"
                />
            </div>
            <div className="w-full md:w-full px-2 mb-4">
                <label
                    htmlFor="longitud"
                    className="text-gray-700 dark:text-gray-300 text-lg"
                >
                    Coordenadas
                </label>
                <div>
                <input
                    id="latitud"
                    {...register("latitud")}
                    placeholder="Latitud"
                    className="dark:bg-gray-700 dark:text-white text-base w-full md:w-1/3 mt-2 mr-8 p-2"
                />
                <input
                    id="longitud"
                    {...register("longitud")}
                    placeholder="Longitud"
                    className="dark:bg-gray-700 dark:text-white text-base w-full md:w-1/3 mt-2 p-2"
                />    
                </div>
                <button type="submit" className="w-full md:w-auto mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 w-60 text-center ">
                    Crear Parada
                </button>
            </div>
        </form>
      </>
    )
}
function RutaPage() {
    const [stops, setStops] = useState<Stop[]>([]);
    const location = useLocation()
    const { id_ruta, id_linea } = location.state
    const { token } = useAuthStore();
    const decoded = jwtDecode(token);

  useEffect(() => {
    const startCoordinates = [-17.78373015039757, -63.18042200265567];
    const initializeMap = async () => {

        initMap(startCoordinates);
  

        await dibujarParadas(id_ruta); 

      };
      initializeMap()
  }, []);

  useEffect(() => {

    async function fetchData() {
      try {
        const resParadas = await paradas(id_ruta)
        console.log('xd')
        console.log(resParadas)
        setStops(resParadas.data)
        console.log(stops)
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-h-[calc(90vh-8rem)]">
        <h1 className="text-4xl font-bold mb-8 text-center">
            {id_linea} - Ruta {id_ruta} 
        </h1>
        <div className="container mx-auto p-4 h-full flex flex-col md:flex-row ">
            
            <div className="flex flex-col md:flex-row w-full h-full md:w-full lg-w-2/3 ">
                <div className="w-full md:w-full lg-w-2/3 flex flex-col m-5">
                    <h2 className="text-2xl font-bold mb-4">MAPA</h2>
                    <div className="overflow-auto md:w-full pl-4">
                        <div id="map" style={{ width: '100%', height: '500px' }}></div>
                    </div>
                    { decoded.role == "Operador" ? (<CreateStopForm /> ) : null }
                </div>
                </div>
                <div className="w-full max-h-[calc(87vh-8rem)] md:w-full lg-w-1/3 flex flex-col m-5 ml-8">
                    <h2 className="text-2xl font-bold mb-4">PARADAS</h2>
                    <div className="w-full overflow-y-auto md:w-full pl-4" >           
                        {stops.map((stop) => (
                            <StopCard key={stop.nombre_parada} stop={stop} role={decoded.role} />
                        ))}
                    </div>
                </div>
        </div>
    </div>
  );
}

export default RutaPage;
