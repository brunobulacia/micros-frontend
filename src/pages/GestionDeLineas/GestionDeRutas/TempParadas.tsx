"use client";

import { useEffect, useState } from "react";
import { initMap, dibujarParadas } from "../../../lib/map"; // Asegúrate de importar correctamente las funciones del archivo donde se encuentran
import { paradas, rutas } from "@/api/rutas";
import { useLocation } from "react-router-dom";
import { DecodedToken, Stop, RouteType } from "../../../types";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { handleAxiosError } from "@/utils/handleErrors";
import { StopCard } from "../../../components/cards/StopCard";
import { CreateStopForm } from "../../../components/cards/CreateStopForm";

function RutaPage() {
  const [stops, setStops] = useState<Stop[]>([]);
  const location = useLocation();
  const { id_linea } = location.state;
  console.log(location)
  const { token } = useAuthStore();
  const { role } = jwtDecode(token) as DecodedToken;

  useEffect(() => {
    async function fetchData() {
      try {
        const ruta = await rutas(id_linea)
        const id_ruta = ruta.data[0].id_ruta
        const resParadas = await paradas(id_ruta);
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
        LINEA 1 - RUTA {1}
      </h1>
      <div className="container mx-auto p-4 h-full flex flex-col ">
        <div className="max-h-[calc(87vh-8rem)] w-full flex flex-col m-5 ml-8">
          <h2 className="text-2xl font-bold mb-4">PARADAS</h2>
          <div className="w-full overflow-y-auto md:w-full pl-4">
            { stops.map((stop) => (
              <StopCard key={stop.nombre_parada} stop={stop} role={role} />
            )) }
          </div>
        </div>
        {role === "Operador" && <CreateStopForm />}
      </div>
    </div>
  );
}

export default RutaPage;

