"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, Turno } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { turnos } from "@/api/turno";
import { TurnoCard } from "@/components/cards/TurnoCard";
import { CrearTurno } from "@/components/forms/CrearTurno";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TurnosPage() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;

  const [turnosList, setTurnosList] = useState<Turno[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCrearTurnoOpen, setIsCrearTurnoOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { role } = decoded;
      try {
        if (role === "Operador") {
          const resTurnos = await turnos(token);
          console.log(resTurnos.data);

          const sortedTurnos = resTurnos.data.sort((a, b) => {
            const horaA = new Date(`1970-01-01T${a.hora_salida}Z`);
            const horaB = new Date(`1970-01-01T${b.hora_salida}Z`);
            return horaB.getTime() - horaA.getTime();
          });

          setTurnosList(sortedTurnos);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }

    fetchData();
  }, [token, decoded.role]);

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredTurnos = turnosList
    .filter(
      (turno) =>
        turno.fecha_horario === currentDate &&
        (turno.chofer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          turno.interno.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const horaA = new Date(`1970-01-01T${a.hora_salida}Z`);
      const horaB = new Date(`1970-01-01T${b.hora_salida}Z`);
      return horaA.getTime() - horaB.getTime();
    });

  return (
    <div className="container mx-auto p-4 h-full flex flex-col">
      <div className="flex mb-8 flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center w-full">
          <div className="relative w-full bg-white">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="w-full md:w-auto bg-blue-800"
          onClick={() => setIsCrearTurnoOpen(true)}
        >
          Crear Turno
        </Button>
      </div>
      <div className="flex-grow overflow-hidden">
        {filteredTurnos.length === 0 ? (
          <p>No hay turnos activos por el momento.</p>
        ) : (
          <div className="h-full overflow-y-auto pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredTurnos.map((turno) => (
                <TurnoCard key={turno.id_turno} turno={turno} />
              ))}
            </div>
          </div>
        )}
      </div>
      <CrearTurno open={isCrearTurnoOpen} onOpenChange={setIsCrearTurnoOpen} />
    </div>
  );
}
