"use client";
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useAuthStore } from "@/store/auth";
import { bitacoraRequest } from "@/api/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface BitacoraItem {
  id: number;
  id_bitacora: string;
  usuario_bitacora: string;
  tipo: string;
  accion: string;
  fecha: string;
  hora: string;
  ip: string;
}

const columnHelper = createColumnHelper<BitacoraItem>();

const columns = [
  columnHelper.accessor("id_bitacora", {
    header: "ID Bitácora",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("usuario_bitacora", {
    header: "Usuario",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tipo", {
    header: "Tipo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("accion", {
    header: "Acción",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fecha", {
    header: "Fecha",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hora", {
    header: "Hora",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("ip", {
    header: "IP",
    cell: (info) => info.getValue(),
  }),
];

export default function BitacoraPage() {
  const { token } = useAuthStore();
  const [bitacora, setBitacora] = useState<BitacoraItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data: bitacora,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function fetchBitacora() {
      try {
        const bitacoraRes = await bitacoraRequest(token);

        // Ordena por fecha y luego por hora, ambas de forma descendente
        const sortedData = bitacoraRes.data.sort(
          (a: BitacoraItem, b: BitacoraItem) => {
            // Primero, ordena por fecha en orden descendente
            const dateComparison =
              new Date(b.fecha).getTime() - new Date(a.fecha).getTime();

            if (dateComparison === 0) {
              // Si las fechas son iguales, compara por hora en orden descendente
              return b.hora.localeCompare(a.hora);
            }

            return dateComparison;
          }
        );

        setBitacora(sortedData);
        console.log(sortedData);
      } catch (error) {
        setError("Error al traer la bitácora.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBitacora();
  }, [token]);

  return (
    <div className="p-6 bg-slate-300 rounded-lg min-h-screen">
      <div className="flex items-center">
        <Input
          className="mb-6 ml-3 w-[50%] text-lg bg-white"
          placeholder="Filtrar Datos..."
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          id="search"
        />
        <label htmlFor="search">
          <Search className="mb-6 ml-3" />
        </label>
      </div>
      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md rounded-lg">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Bitácora de Base de Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div>
              <div className="rounded-md border border-zinc-200 overflow-hidden overflow-x-auto">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="border-b border-zinc-200 bg-zinc-200"
                      >
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-4 py-2 text-left text-zinc-800 font-semibold"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-zinc-200 bg-white  even:bg-zinc-200
                        even:text-white"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-2 text-zinc-800">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between space-x-2 mt-4">
                {table.getCanPreviousPage() && (
                  <Button onClick={() => table.previousPage()}>Anterior</Button>
                )}
                {table.getCanNextPage() && (
                  <Button onClick={() => table.nextPage()}>Siguiente</Button>
                )}
                {table.getPageCount() > 1 && table.getCanNextPage() && (
                  <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  >
                    Última Página
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
