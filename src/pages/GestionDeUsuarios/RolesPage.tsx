// RolesPage.tsx
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSanciones } from "@/api/sancion";

interface FichaItem {
  id_ficha: string;
  fecha: string;
  hora: string;
  monto: string;
  estado: string;
  descripcion: string;
  usuario_chofer: string;
  usuario_operador: string;
  id_sancion: string;
}

const columnHelper = createColumnHelper<FichaItem>();

export default function HistorialSancPage() {
  const { token } = useAuthStore();
  const [ficha, setFicha] = useState<FichaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");

  const columns = [
    columnHelper.accessor("fecha", {
      header: "Fecha",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("hora", {
      header: "Hora",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("monto", {
      header: "Monto",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("estado", {
      header: "Estado",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("descripcion", {
      header: "Descripcion",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("usuario_chofer", {
      header: "Chofer",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("usuario_operador", {
      header: "Operador",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: ficha,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerFichas() {
      try {
        const fichaResponse = await getSanciones(token);
        setFicha(fichaResponse.data);
        console.log(fichaResponse.data);
      } catch (error) {
        setError("Failed to fetch bitacora data. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerFichas();
  }, [token]);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Search and filter input */}
      <div className="flex items-center">
        <Input
          className="mb-6 ml-3 w-[50%] text-lg"
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

      {/* Table card */}
      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Gestion de Roles
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
              <div className="rounded-md border border-zinc-200 overflow-x-auto">
                <table className="w-full min-w-max">
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
                        className="border-b border-zinc-200 bg-white even:bg-zinc-200 even:text-white"
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
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
