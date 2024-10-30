import { bitacoraRequest } from "../api/auth";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.ts";

function BitacoraPage() {
  const { token } = useAuthStore();
  const [bitacora, setBitacora] = useState<any[]>([]);
  const [bitacoraCharged, setBitacoraCharged] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBitacora() {
      try {
        const bitacoraRes = await bitacoraRequest(token);
        setBitacora(bitacoraRes.data);
        setBitacoraCharged(true);
      } catch (error) {
        setBitacoraCharged(true);
        console.error(error);
      }
    }

    fetchBitacora();
  }, [token]);
  console.log(bitacora);
  return (
    <div className="p-6 max-w-3xl mx-auto bg-zinc-900 rounded-xl shadow-md text-zinc-200">
      <h1 className="text-2xl font-bold text-zinc-50 mb-4 text-center">
        Bitácora de Base de Datos
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-800 border border-zinc-700">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-zinc-700 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                ID Bitácora
              </th>
              <th className="px-6 py-3 border-b border-zinc-700 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 border-b border-zinc-700 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 border-b border-zinc-700 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Acción
              </th>
              <th className="px-6 py-3 border-b border-zinc-700 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 border-b border-zinc-700 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Hora
              </th>
            </tr>
          </thead>
          <tbody>
            {bitacora.map((bitacoraItem) => (
              <tr
                key={bitacoraItem.id}
                className="bg-zinc-800 border-b border-zinc-700 hover:bg-zinc-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
                  {bitacoraItem.id_bitacora}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  {bitacoraItem.usuario_bitacora}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  {bitacoraItem.tipo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  {bitacoraItem.accion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  {bitacoraItem.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  {bitacoraItem.hora}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BitacoraPage;
