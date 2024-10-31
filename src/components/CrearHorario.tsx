"use client";
/**
import { useState } from "react";
import { Clock } from "lucide-react";
import { crearTurno } from "../api/turno";
import { useAuthStore } from "@/store/auth";
import { handleAxiosError } from "@/utils/handleErrors";

function CrearHorario() {
  const { token } = useAuthStore();
  const [newSchedule, setNewSchedule] = useState({
    horaSalida: undefined,
    horaLlegada: undefined,
    puntoSalida: "",
    fecha: undefined,
    chofer: "",
    interno: "",
  });
  const handleScheduleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateSchedule = async (e: React.FormEvent) => {
    try {
      await crearTurno(
        {
          hora_salida: newSchedule.horaSalida,
          hora_llegada: newSchedule.horaLlegada,
          punto_salida: newSchedule.puntoSalida,
          fecha_horario: newSchedule.fecha,
          chofer: newSchedule.chofer,
          interno: newSchedule.interno,
        },
        token
      );
      alert("Horario creado con إxito!"); // Replace with actual API call and error handling
    } catch (error) {
      handleAxiosError(error);
    }
  }
    return (
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
              />
            </div>
            <div>
              <label
                htmlFor="chofer"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Chofer
              </label>
              <input
                type="text"
                id="chofer"
                name="chofer"
                value={newSchedule.chofer}
                onChange={handleScheduleInputChange}
                className="p-2 border rounded-lg w-full"
                required
              />
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
    );
  };


export default CrearHorario;

 */

import { useAuthStore } from "@/store/auth";
import { TurnoData } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { useForm } from "react-hook-form";
import { crearTurno } from "@/api/turno";
import { Clock } from "lucide-react";

export const CrearHorario = () => {
  const { token } = useAuthStore();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      chofer: "",
      interno: "",
      partida: "",
    },
  });

  const onSubmit = async (data: TurnoData) => {
    try {
      const turno: TurnoData = {
        chofer: data.chofer,
        interno: data.interno,
        partida: data.partida,
      };

      await crearTurno(turno, token);

      alert("Turno iniciado con exito");
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    }
  };
  return (
    <>
      
      <form
      
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md w-full md:w-1/2 border-2 border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4">CREAR TURNO</h2>
        <div className="w-full md:w-full px-2 mb-4 bg">
          <label
            htmlFor="chofer"
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            Chofer
          </label>
          <input
            id="chofer"
            {...register("chofer")}
            placeholder="Ingresa el chofer"
            className="dark:bg-gray-700 dark:text-white text-base w-full md:w-full mt-2 p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-full px-2 mb-4">
          <label
            htmlFor="orden"
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            Interno
          </label>
          <input
            id="interno"
            {...register("interno")}
            placeholder="Ingresa el interno"
            className="dark:bg-gray-700 dark:text-white text-base md:w-full mt-2 p-2 border rounded-lg w-full"
          />
        </div>
        <div className="w-full md:w-full px-2 mb-4">
          <label
            htmlFor="punto_de_salida"
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            Punto de Salida
          </label>
          <div>
            <input
              id="partida"
              {...register("partida")}
              placeholder="Punto De salida"
              className="dark:bg-gray-700 dark:text-white text-base w-full mt-2 mr-8 p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-16 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 text-center "
          >
            <Clock className="w-6 h-6 mr-2" />
            Crear Turno
          </button>
        </div>
      </form>
    </>
  );
};

export default CrearHorario