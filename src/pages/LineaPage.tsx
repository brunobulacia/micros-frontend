"use client";

import { useState, useEffect } from "react";
import { Search, UserPlus, Clock, Truck } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { choferRes, crearChofer } from "@/api/chofer";
import { rutas } from "@/api/rutas";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, Driver, RouteType } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { DriverCard } from "@/components/DiverCard";
import { RouteCard } from "@/components/RouteCard";

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
  const [newSchedule, setNewSchedule] = useState({
    horaSalida: "",
    horaLlegada: "",
    puntoSalida: "",
    fecha: "",
    chofer: "",
    interno: "",
  });
  const [newBus, setNewBus] = useState({
    placa: "",
    interno: "",
    modelo: "",
    ano: "",
    seguro: "",
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

  const handleScheduleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBus({
      ...newBus,
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

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the API call to create a new schedule here
    console.log("New schedule:", newSchedule);
    alert("Horario creado con éxito!"); // Replace with actual API call and error handling
  };

  const handleCreateBus = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the API call to create a new bus here
    console.log("New bus:", newBus);
    alert("Micro registrado con éxito!"); // Replace with actual API call and error handling
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
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">REGISTRAR MICRO</h2>
                  <form
                    onSubmit={handleCreateBus}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      name="placa"
                      placeholder="Placa"
                      value={newBus.placa}
                      onChange={handleBusInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <input
                      type="text"
                      name="interno"
                      placeholder="Interno"
                      value={newBus.interno}
                      onChange={handleBusInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <input
                      type="text"
                      name="modelo"
                      placeholder="Modelo"
                      value={newBus.modelo}
                      onChange={handleBusInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <input
                      type="number"
                      name="ano"
                      placeholder="Año"
                      value={newBus.ano}
                      onChange={handleBusInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <input
                      type="text"
                      name="seguro"
                      placeholder="Seguro"
                      value={newBus.seguro}
                      onChange={handleBusInputChange}
                      className="p-2 border rounded-lg w-full"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-black text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                    >
                      <Truck className="w-6 h-6 mr-2" />
                      <span>Registrar Micro</span>
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">AGREGAR HORARIO</h2>
                <form onSubmit={handleCreateSchedule} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="horaSalida"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Hora de salida
                      </label>
                      <input
                        type="time"
                        id="horaSalida"
                        name="horaSalida"
                        value={newSchedule.horaSalida}
                        onChange={handleScheduleInputChange}
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="horaLlegada"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Hora de llegada
                      </label>
                      <input
                        type="time"
                        id="horaLlegada"
                        name="horaLlegada"
                        value={newSchedule.horaLlegada}
                        onChange={handleScheduleInputChange}
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="puntoSalida"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Punto de salida
                      </label>
                      <input
                        type="text"
                        id="puntoSalida"
                        name="puntoSalida"
                        value={newSchedule.puntoSalida}
                        onChange={handleScheduleInputChange}
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fecha"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Fecha
                      </label>
                      <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={newSchedule.fecha}
                        onChange={handleScheduleInputChange}
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="chofer"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Chofer
                      </label>
                      <select
                        id="chofer"
                        name="chofer"
                        value={newSchedule.chofer}
                        onChange={handleScheduleInputChange}
                        className="p-2 border rounded-lg w-full"
                        required
                      >
                        <option value="">Seleccionar chofer</option>
                        {drivers.map((driver) => (
                          <option key={driver.usuario} value={driver.usuario}>
                            {driver.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="interno"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Interno
                      </label>
                      <input
                        type="text"
                        id="interno"
                        name="interno"
                        value={newSchedule.interno}
                        onChange={handleScheduleInputChange}
                        className="p-2 border rounded-lg w-full"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center w-full"
                  >
                    <Clock className="w-6 h-6 mr-2" />
                    <span>Agregar Horario</span>
                  </button>
                </form>
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
        </div>
      </div>
    </div>
  );
}
