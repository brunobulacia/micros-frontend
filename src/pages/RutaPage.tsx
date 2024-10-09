"use client"; // Marca el componente como compatible con rendering del cliente

import { useEffect, useState } from "react";
import { initMap, dibujarParadas } from '../lib/map'; // Asegúrate de importar correctamente las funciones del archivo donde se encuentran
import { OctagonMinus } from 'lucide-react'
import { paradas } from "@/api/rutas";
import { useLocation } from "react-router-dom";
import { Stop } from "../types"

const StopCard = ({ stop }: { stop: Stop }) => {
    return (
      <button className="border rounded-lg p-4 mb-4 flex items-center w-full lg:w-5/6 bg-white hover:bg-zinc-200">
        <div className="flex items-center">
        <OctagonMinus className="w-17px h-17px mr-10" />
          <p className="font-bold text-xl">{stop.nombre_parada}</p>
        </div>
      </button>
    );
  };

function RutaPage() {
    const [stops, setStops] = useState<Stop[]>([]);
    const location = useLocation()
    const { id_ruta } = location.state
  useEffect(() => {
    const startCoordinates = [-17.847643049293538, -63.15881657845468];
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
    <div className="container mx-auto p-4 h-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
            RUTA {id_ruta}
        </h1>
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-full lg-w-2/3 flex flex-col m-5">
                <h2 className="text-2xl font-bold mb-4">MAPA</h2>
                <div className="overflow-auto md:w-full pl-4">
                    <div id="map" style={{ width: '100%', height: '500px' }}></div>
                </div>
            </div>
            <div className="w-full md:w-full lg-w-1/3 flex flex-col m-5 ml-8">
                <h2 className="text-2xl font-bold mb-4">PARADAS</h2>
                <div className="w-full h-3/4 overflow-y-auto md:w-full pl-4" >           
                    {stops.map((stop) => (
                        <StopCard key={stop.nombre_parada} stop={stop} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default RutaPage;
