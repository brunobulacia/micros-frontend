"use client";

import { useState, useEffect } from "react";
import { Search, UserPlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { choferRes, crearChofer } from "@/api/chofer";
import { rutas } from "@/api/rutas";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, Driver, RouteType } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { DriverCard } from "@/components/DiverCard";
import { RouteCard } from "@/components/RouteCard";
import CrearHorario from "@/components/CrearHorario";
import CrearMicro from "@/components/CrearMicro";

export default function LineaPage() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDriver, setNewDriver] = useState({
    usuario: "",
    licencia_categoria: "",
  });

  const location = useLocation();
  const { state } = location;
  const id_linea = state.id_linea;

  useEffect(() => {
    async function fetchData() {
      const { role } = decoded;
      try {
        if (role === "Operador") {
          const resChoferes = await choferRes(token);
          setDrivers(resChoferes.data.listaDeChoferes);
        }
        const resRutas = await rutas(id_linea);
        setRoutes(resRutas.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver({
      ...newDriver,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearChofer(
        {
          usuario: newDriver.usuario,
          licencia: newDriver.licencia_categoria,
        },
        token
      );
      alert("Chofer creado con éxito!");
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.usuario.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h2 className="text-2xl font-bold mb-4">CHOFERES</h2>
              <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-h-[50vh] overflow-y-auto">
                {filteredDrivers.map((driver) => (
                  <DriverCard key={driver.usuario} driver={driver} />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">AGREGAR CHOFER</h2>
                  <form
                    onSubmit={handleCreateDriver}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      name="usuario"
                      placeholder="Usuario"
                      value={newDriver.usuario}
                      onChange={handleInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <input
                      type="text"
                      name="licencia_categoria"
                      placeholder="Licencia"
                      value={newDriver.licencia_categoria}
                      onChange={handleInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-black text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                    >
                      <UserPlus className="w-6 h-6 mr-2" />
                      <span>Agregar Chofer</span>
                    </button>
                  </form>
                </div>
                <CrearMicro linea={id_linea} />
              </div>
              <CrearHorario />
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
        </div>
      </div>
    </div>
  );
}
