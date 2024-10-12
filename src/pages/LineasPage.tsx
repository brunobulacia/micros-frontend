"use client";

import { useState, useEffect } from "react";
import { BusFront } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { rutasLineasResponse } from "../api/rutas";
import { handleAxiosError } from "@/utils/handleErrors";
import { Line } from "@/types";

const LineCard = ({ line }: { line: Line }) => {
  const statusColor = {
    Disponible: "bg-green-500",
    Trabajando: "bg-yellow-500",
    "No Disponible": "bg-red-500",
  };
  const navigate = useNavigate();

  return (
    <button
      className="border rounded-lg p-4 mb-4 flex items-center w-[99%] bg-white hover:bg-zinc-100"
      onClick={() => navigate("/dashboard/linea", { state: line })}
    >
      <BusFront className="w-20 h-20 mr-4" />
      <div>
        <h3 className="font-bold">{line.nombre_linea}</h3>
        <p>Sindicato: {line.id_sindicato}</p>
      </div>
      <div
        className={`ml-auto w-3 h-3 rounded-full ${statusColor["Trabajando"]}`}
      ></div>
      <span className="ml-2">TRABAJANDO</span>
    </button>
  );
};

function LineasPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [linesCharged, setLinesCharged] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLines() {
      try {
        const lineasRes = await rutasLineasResponse();
        setLines(lineasRes.data);
        setLinesCharged(true);
      } catch (error) {
        setLinesCharged(true);
        handleAxiosError(error);
      }
    }

    fetchLines();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">LINEAS DISPONIBLES</h1>
      <div className="border rounded-lg bg-white overflow-y-auto max-h-[calc(95vh-8rem)] p-5">
        {lines.length > 0 ? (
          lines.map((line) => <LineCard key={line.id_linea} line={line} />)
        ) : !linesCharged ? (
          <p>Cargando lineas...</p>
        ) : (
          <p>No hay líneas disponibles.</p>
        )}
      </div>
    </>
  );
}

export default LineasPage;
