import { useState } from "react";
import { Micro } from "@/types";
import { setEstado } from "@/api/estado";
import { programarMantenimiento } from "@/api/mantenimiento";
import { handleAxiosError } from "@/utils/handleErrors";

interface MicroCardProps {
  micro: Micro;
  token: string;
}

export const MicroCard = ({ micro, token }: MicroCardProps) => {
  const [estado, setEstadoLocal] = useState(
    micro.estados[0]?.estado || "NO DISPONIBLE"
  );
  const [nuevoEstado, setNuevoEstado] = useState(estado);
  const [mantenimientoModal, setMantenimientoModal] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  const estadoColor = {
    DISPONIBLE: "bg-green-500",
    TRABAJANDO: "bg-yellow-500",
    INCIDENTE: "bg-red-500",
    "NO DISPONIBLE": "bg-gray-500",
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as
      | "DISPONIBLE"
      | "TRABAJANDO"
      | "INCIDENTE"
      | "NO DISPONIBLE";
    setNuevoEstado(value);
  };

  const handleConfirmEstado = async () => {
    try {
      await setEstado({ estado: nuevoEstado, id_micro: micro.id_micro });
      setEstadoLocal(nuevoEstado);
      alert("Estado actualizado con éxito.");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleMantenimientoSubmit = async () => {
    try {
      await programarMantenimiento({
        descripcion,
        interno: micro.interno,
        token,
        fecha,
      });
      alert("Mantenimiento programado con éxito.");
      setMantenimientoModal(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white">
      <div className="flex items-center">
        <div
          className={`h-16 w-4 m-0 rounded-full ${estadoColor[estado]}`}
        ></div>
        <span className="font-semibold mr-4">{}</span>
      </div>
      <div className="ml-4 mr-4">
        <h3 className="font-bold">{micro.modelo}</h3>
        <p>
          <b>Placa:</b> {micro.placa}
        </p>
        <p>
          <b>Interno:</b> {micro.interno}
        </p>
        <p>
          <b>Modelo:</b> {micro.modelo}
        </p>
        <p>
          <b>Año:</b> {micro.año}
        </p>
        <p>
          <b>Seguro:</b> {micro.seguro}
        </p>
      </div>
      <div className="ml-auto flex flex-col space-y-2 items-end">
        <div className="flex items-center space-x-2">
          <select
            className="w-full mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-900 bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-200/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 text-center border-2 border-gray-950"
            value={nuevoEstado}
            onChange={handleEstadoChange}
          >
            <option value="DISPONIBLE">DISPONIBLE</option>
            <option value="TRABAJANDO">TRABAJANDO</option>
            <option value="INCIDENTE">INCIDENTE</option>
            <option value="NO DISPONIBLE">NO DISPONIBLE</option>
          </select>
          <button
            className="w-1/3 mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 text-center "
            onClick={handleConfirmEstado}
          >
            Confirmar
          </button>
        </div>
        <button
          className="w-full mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 text-center"
          onClick={() => setMantenimientoModal(true)}
        >
          Programar Mantenimiento
        </button>
      </div>

      {mantenimientoModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-2">Programar Mantenimiento</h2>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">
                Descripción
              </label>
              <input
                type="text"
                className="w-full p-1 border rounded text-sm"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">Fecha</label>
              <input
                type="date"
                className="w-full p-1 border rounded text-sm"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-2 py-1 bg-gray-300 rounded text-xs hover:bg-gray-400"
                onClick={() => setMantenimientoModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                onClick={handleMantenimientoSubmit}
              >
                Programar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
