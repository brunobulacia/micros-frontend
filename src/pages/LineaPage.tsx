"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { rutas } from "@/api/rutas";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, RouteType, Turno } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { RouteCard } from "@/components/RouteCard";
import CrearHorario from "@/components/CrearHorario";
import CrearMicro from "@/components/CrearMicro";
import { turnos } from "@/api/turno";
import { TurnoCard } from "@/components/TurnoCard";
import CrearChoferFrom from "@/components/CrearChoferForm";

export default function LineaPage() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;

  //const [drivers, setDrivers] = useState<Driver[]>([]);

  const [turnosList, setTurnosList] = useState<Turno[]>([]);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const { state } = location;
  const id_linea = state.id_linea;

  useEffect(() => {
    async function fetchData() {
      const { role } = decoded;
      try {
        if (role === "Operador") {
          //const resChoferes = await choferRes(token);
          // setDrivers(resChoferes.data.listaDeChoferes);

          const resTurnos = await turnos(token, id_linea);
          console.log(resTurnos.data);
          setTurnosList(resTurnos.data);
        }
        const resRutas = await rutas(id_linea);
        setRoutes(resRutas.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }

    fetchData();
  }, []);

  const filteredTurnos = turnosList.filter(
    (turno) =>
      turno.chofer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turno.interno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {state.nombre_linea.toUpperCase()}
      </h1>
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {decoded.role === "Operador" && (
          <>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">TURNOS ACTIVOS</h2>
              <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-h-[50vh] overflow-y-auto">
                {filteredTurnos.map((turno) => (
                  <TurnoCard key={turno.id_turno} turno={turno} />
                ))}
              </div>
            </div>
          </>
        )}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">RUTAS</h2>
          <div className="space-y-4 bg-white rounded-lg shadow-md p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {routes.map((route) => (
              <RouteCard
                key={route.id_ruta}
                route={route}
                id_linea={state.nombre_linea}
              />
            ))}
          </div>
          {decoded.role === "Operador" && (
            <>
              <CrearHorario />
              <CrearMicro linea={id_linea} />
              <CrearChoferFrom />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
