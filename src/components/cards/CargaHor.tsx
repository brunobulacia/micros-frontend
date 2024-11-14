"use client";

import { Bus } from "lucide-react";
interface Linea {
  id_linea: string;
  nombre_linea: string;
  id_sindicato: string;
}

interface Operador {
  usuario_operador: string;
  id_linea: string;
  linea: Linea;
}

interface Horario {
  hora_llegada_aproximada: string;
  hora_salida: string;
  horas_turno: string;
  operadore: Operador;
}

interface Chofere {
  usuario_chofer: string;
  licencia_categoria: string;
  estado: string;
}

interface micro {
  interno: string;
  placa: string;
}

interface Turno {
  id_turno: string;
  usuario_chofer: string;
  punto_de_salida: string;
  fecha: string;
  id_horario: string;
  id_micro: string;
  horario: Horario;
  chofere: Chofere;
  hora_llegada?: string;
  micro: micro;
}

export const CargaHorCard = ({ turno }: { turno: Turno }) => {
  return (
    <div className="w-full">
      <div className="border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center justify-between w-full bg-slate-200 shadow-inner">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-4 sm:mb-0">
          <Bus className="w-20 h-20 mb-4 sm:mb-0 sm:mr-4" />
          <div className="flex flex-col sm:flex-row text-center sm:text-left">
            <div className="mb-4 sm:mb-0 sm:mr-4"></div>

            <div>
              <p>
                <b>Hora de salida:</b> {turno.horario.hora_salida}
              </p>
              <p>
                <b>Hora de llegada:</b>{" "}
                {turno.hora_llegada ?? "No hay hora de llegada"}
              </p>
              <p>
                <b>Placa:</b> {turno.micro.placa}
              </p>
              <p>
                <b>Interno:</b> {turno.micro.interno}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
