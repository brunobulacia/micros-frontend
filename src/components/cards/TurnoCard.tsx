"use client";

import { useAuthStore } from "@/store/auth";
import { CircleUserRound, OctagonMinus } from "lucide-react";
import { Turno } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { finalizarTurno } from "@/api/turno";

const handleStopConfirmation = async (turno: string, token: string) => {
  const isConfirmed = window.confirm(
    "¿Estás seguro de que quieres terminar este turno?"
  );

  if (isConfirmed) {
    await StopTurno(turno, token);
  }
};

const StopTurno = async (turno: string, token: string) => {
  const id_turno = turno;
  try {
    if (id_turno) {
      console.log(id_turno);
      await finalizarTurno(id_turno, token);
      alert("Turno terminado con éxito");
      window.location.reload();
    } else {
      console.error("No se pudo obtener el id del turno");
    }
  } catch (error) {
    handleAxiosError(error);
  }
};

export const TurnoCard = ({ turno }: { turno: Turno }) => {
  const { token } = useAuthStore();

  return (
    <div className="w-full">
      <div className="border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center justify-between w-full bg-slate-200 shadow-inner">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-4 sm:mb-0">
          <CircleUserRound className="w-16 h-16 mb-4 sm:mb-0 sm:mr-4" />
          <div className="flex flex-col sm:flex-row text-center sm:text-left">
            <div className="mb-4 sm:mb-0 sm:mr-4">
              <h3 className="font-bold">INTERNO {turno.interno}</h3>
              <p>
                <b>Chofer: </b>
                {turno.chofer}
              </p>
              <p>
                <b>Placa:</b> {turno.placa}
              </p>
            </div>
            <div>
              <p>
                <b>Hora de salida:</b> {turno.hora_salida}
              </p>
              <p>
                <b>Hora de llegada:</b>{" "}
                {turno.hora_llegada ?? "No hay hora de llegada"}
              </p>
              <p>
                <b>Fecha:</b> {turno.fecha}
              </p>
              <p>
                <b>Punto de salida:</b> {turno.punto_de_salida}
              </p>
            </div>
          </div>
        </div>
        <button
          className="h-10 w-10 rounded-md bg-white hover:bg-red-500 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {
            handleStopConfirmation(turno.id_turno, token);
          }}
        >
          <OctagonMinus className="h-6 w-6 text-red-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};
