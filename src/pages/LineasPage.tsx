"use client";

import { useState, useEffect } from "react";
import { Search, BusFront } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      <div className={`ml-auto w-3 h-3 rounded-full`}></div>
      <span className="ml-2">TRABAJANDO</span>
    </div>
  );
};

export default function LineaPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token del localStorage
        const token = JSON.parse(localStorage.getItem("auth")).state.token;

        if (!token) {
          console.error("No se encontró el token de autenticación");
          return;
        }

        // Configurar los headers para incluir el token
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Configurar el body para incluir el token

        // Realizar las peticiones a la API incluyendo los headers y el body

        const linesResponse = await fetch(
          "https://proyecto-micros.onrender.com/rutas/lineas",
          {
            method: "GET",
            headers,
          }
        );

        if (!linesResponse.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const routesData = await linesResponse.json();

        console.log(routesData);

        setLines(routesData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };

    fetchData();
  }, []);

  const filteredLines = lines.filter((line) =>
    line.nombre_linea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-8xl font-bold mb-8 text-center">LINEAS</h1>
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
      <div className="flex flex-col md:flex-row">
        <div className="w-full pr-0 md:pr-4 mb-8 md:mb-0">
          {filteredLines.map((line) => (
            <button
              className="w-full pr-0 md:pr-4 mb-8 md:mb-0"
              onClick={() =>
                navigate(`/dashboard/linea`, {
                  state: {
                    id_linea: line.id_linea,
                    nombre_linea: line.nombre_linea,
                  },
                })
              }
              key={line.id_linea}
            >
              <LineCard key={line.id_linea} line={line} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
