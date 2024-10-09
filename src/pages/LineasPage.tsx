"use client";

import { useState, useEffect } from "react";
import { BusFront } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { rutasLineasResponse } from "../api/rutas";
// Interfaz de la línea
interface Line {
  id_linea: number;
  nombre_linea: string;
  id_sindicato: number;
}

const LineCard = ({ line }: { line: Line }) => {
  const statusColor = {
    Disponible: "bg-green-500",
    Trabajando: "bg-yellow-500",
    "No Disponible": "bg-red-500",
  };

  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white hover:bg-zinc-100">
      <BusFront className="w-20 h-20 mr-4" />
      <div>
        <h3 className="font-bold">{line.nombre_linea}</h3>
        <p>Sindicato: {line.id_sindicato}</p>
      </div>
      <div
        className={`ml-auto w-3 h-3 rounded-full ${statusColor["Trabajando"]}`}
      ></div>
      <span className="ml-2">TRABAJANDO</span>
    </div>
  );
};

function LineasPage() {
  // Estado para almacenar las líneas obtenidas
  const [lines, setLines] = useState<Line[]>([]);

  // Efecto para obtener las líneas al montar el componente
  useEffect(() => {
    async function fetchLines() {
      try {
        // Solicitud a la API para obtener las líneas
        const lineasRes = await rutasLineasResponse(); // Asegúrate de pasar el token si es necesario
        setLines(lineasRes.data); // Asumiendo que el formato de la respuesta es lineasRes.data
      } catch (error) {
        console.error("Error al obtener las líneas:", error);
      }
    }

    fetchLines();
  }, []); // Ejecuta el efecto solo si el token cambia

  return (
    <div className="overflow-auto max-h-[calc(100vh-8rem)]">
      <h1 className="text-xl font-bold mb-4">Líneas Disponibles</h1>
      {lines.length > 0 ? (
        lines.map((line) => <LineCard key={line.id_linea} line={line} />)
      ) : (
        <p>No hay líneas disponibles.</p>
      )}
    </div>
  );
}

export default LineasPage;
