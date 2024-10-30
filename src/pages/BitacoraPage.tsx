// BitacoraPage.tsx

import React from "react";
import { table, thead, tbody, tr, th, td } from "shadcn";

function BitacoraPage() {
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
            {/* Aquí irían las filas de la bitácora, generadas dinámicamente */}
            <tr className="bg-zinc-800 border-b border-zinc-700 hover:bg-zinc-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                usuario123
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                Inserción
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                Añadir registro
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                2024-10-29
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                14:30
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BitacoraPage;
