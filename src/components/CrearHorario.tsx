"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

function CrearHorario() {
  const [newSchedule, setNewSchedule] = useState({
    horaSalida: "",
    horaLlegada: "",
    puntoSalida: "",
    fecha: "",
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
    e.preventDefault();
    // Implement the API call to create a new schedule here
    console.log("New schedule:", newSchedule);
    alert("Horario creado con éxito!"); // Replace with actual API call and error handling
  };
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
          <div>{/* AGREGAR EL INPUT DE CHOFER */}</div>
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
}

export default CrearHorario;
