
/*
function MicrosPage() {
  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-50 rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-zinc-800 mb-4 text-center">
        MANTENIMIENTO DE MICRO
      </h1>

      <h2 className="text-xl font-bold text-zinc-800">Registrar Micro</h2>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-zinc-700"
        >
          Fecha
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="mt-1 block w-full bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 focus:ring-zinc-500 focus:border-zinc-500"
        />
      </div>

      <div>
        <label
          htmlFor="micro"
          className="block text-sm font-medium text-zinc-700"
        >
          Micro
        </label>
        <input
          type="text"
          id="micro"
          name="micro"
          placeholder="Número de Micro"
          className="mt-1 block w-full bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 focus:ring-zinc-500 focus:border-zinc-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-zinc-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Descripción del micro"
          className="mt-1 block w-full bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 focus:ring-zinc-500 focus:border-zinc-500"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-zinc-700 text-white py-2 rounded hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
      >
        Guardar
      </button>
    </div>
  );
}

export default MicrosPage;

*/


"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { getMicros } from "@/api/micros"; // La función para obtener los micros
import { Micro } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { MicroCard } from "@/components/MicroCard";

export default function MicrosPage() {
  const { token } = useAuthStore();
  const location = useLocation();
  const { state } = location;
  const id_linea = state?.id_linea || ""; // Obtén el id de la línea desde la navegación
  const [microsList, setMicrosList] = useState<Micro[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("TODOS");

  // Obtener los micros cuando el componente se monta
  useEffect(() => {
    async function fetchMicros() {
      try {
        const resMicros = await getMicros(token, id_linea); // Llama a la función para obtener los micros
        setMicrosList(resMicros.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }

    fetchMicros();
  }, [token, id_linea]);

  // Filtrar los micros por el término de búsqueda y el estado seleccionado
  const filteredMicros = microsList.filter((micro) => {
    const matchesSearchTerm =
      micro.interno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      micro.placa.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "TODOS" || 
      micro.estados[0]?.estado === filterStatus;

    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        MICROS DE LA LÍNEA {state.nombre_linea?.toUpperCase()}
      </h1>

      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Buscar por interno o placa..."
          className="w-full p-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      <div className="mb-4">
        <select
          className="w-full p-2 border rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="TODOS">TODOS</option>
          <option value="DISPONIBLE">DISPONIBLE</option>
          <option value="TRABAJANDO">TRABAJANDO</option>
          <option value="INCIDENTE">INCIDENTE</option>
          <option value="NO DISPONIBLE">NO DISPONIBLE</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMicros.map((micro) => (
          <MicroCard key={micro.id_micro} micro={micro} token={token}/>
        ))}
      </div>
    </div>
  );
}
