"use client";

import { useEffect, useState } from "react";
import { initMap, dibujarParadas } from "../lib/map"; // Asegúrate de importar correctamente las funciones del archivo donde se encuentran
import { paradas } from "@/api/rutas";
import { useLocation } from "react-router-dom";
import { DecodedToken, Stop } from "../types";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { handleAxiosError } from "@/utils/handleErrors";
import { CreateStopForm } from "@/components/CreateStopForm";
import { StopCard } from "@/components/StopCard";

function RutaPage() {
  const [stops, setStops] = useState<Stop[]>([]);
  const location = useLocation();
  const { id_ruta, id_linea } = location.state;
  const { token } = useAuthStore();
  const { role } = jwtDecode(token) as DecodedToken;

  useEffect(() => {
    const startCoordinates = [-17.78373015039757, -63.18042200265567];
    const initializeMap = async () => {
      try {
        initMap(startCoordinates);
        await dibujarParadas(id_ruta);
      } catch (error) {
        handleAxiosError(error);
      }
    };
    initializeMap();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const resParadas = await paradas(id_ruta);
        console.log("xd");
        console.log(resParadas);
        setStops(resParadas.data);
        console.log(stops);
      } catch (error) {
        handleAxiosError(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-h-[calc(90vh-8rem)]">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {id_linea.toUpperCase()} - Ruta {id_ruta}
      </h1>
      <div className="container mx-auto p-4 h-full flex flex-col md:flex-row ">
        <div className="flex flex-col md:flex-row w-full h-full md:w-full lg-w-2/3 ">
          <div className="w-full md:w-full lg-w-2/3 flex flex-col m-5">
            <h2 className="text-2xl font-bold mb-4">MAPA</h2>
            <div className="overflow-auto md:w-full pl-4">
              <div id="map" style={{ width: "100%", height: "500px" }}></div>
            </div>
            {role == "Operador" ? <CreateStopForm /> : null}
          </div>
        </div>
        <div className="w-full max-h-[calc(87vh-8rem)] md:w-full lg-w-1/3 flex flex-col m-5 ml-8">
          <h2 className="text-2xl font-bold mb-4">PARADAS</h2>
          <div className="w-full overflow-y-auto md:w-full pl-4">
            {stops.map((stop) => (
              <StopCard key={stop.nombre_parada} stop={stop} role={role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RutaPage;