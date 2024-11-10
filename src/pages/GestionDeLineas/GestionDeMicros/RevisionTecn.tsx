/* import { useEffect, useState } from "react";
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
import { getMicros } from "@/api/micros";

interface Estado {
  id_estado: string;
  estado: string;
  fecha: string;
  hora: string;
  id_micro: string;
}

interface MicroItem {
  id_micro: string;
  placa: string;
  interno: string;
  modelo: string;
  año: string;
  seguro: string;
  id_dueño: string;
  id_linea: string;
  estados: Estado[];
}

const columnHelper = createColumnHelper<MicroItem>();

export default function Revision() {
  const { token } = useAuthStore();
  const [micro, setMicro] = useState<MicroItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");

  const columns = [
    columnHelper.accessor("placa", {
      header: "Placa",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("interno", {
      header: "Interno",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("modelo", {
      header: "Modelo",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("año", {
      header: "Año",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("seguro", {
      header: "Seguro",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id_dueño", {
      header: "Dueño",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: micro,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerMicros() {
      try {
        const microResponse = await getMicros(token);
        setMicro(microResponse.data);
        console.log(microResponse.data);
      } catch (error) {
        setError("Failed to fetch bitacora data. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerMicros();
  }, [token]);

  return (
    <div className="p-6 bg-white min-h-screen">
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

      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Revision Tecnica de Micros
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
                <Button onClick={() => table.lastPage()}>Ultima Pagina</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
 */
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
import { getMicros } from "@/api/micros";
import { DialogDemo } from "../../../components/dialogs/AgregarRevTec";

interface Estado {
  id_estado: string;
  estado: string;
  fecha: string;
  hora: string;
  id_micro: string;
}

interface MicroItem {
  id_micro: string;
  placa: string;
  interno: string;
  modelo: string;
  año: string;
  seguro: string;
  id_dueño: string;
  id_linea: string;
  estados: Estado[];
}

const columnHelper = createColumnHelper<MicroItem>();

export default function Revision() {
  const { token } = useAuthStore();
  const [micro, setMicro] = useState<MicroItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [selectedMicro, setSelectedMicro] = useState<MicroItem | null>(null);

  const columns = [
    columnHelper.accessor("placa", {
      header: "Placa",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("interno", {
      header: "Interno",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("modelo", {
      header: "Modelo",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("año", {
      header: "Año",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("seguro", {
      header: "Seguro",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id_dueño", {
      header: "Dueño",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "revision",
      header: "Revision",
      cell: ({ row }) => (
        <Button
          className="hover:bg-green-800"
          onClick={() => setSelectedMicro(row.original)}
        >
          Asignar
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: micro,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerMicros() {
      try {
        const microResponse = await getMicros(token);
        setMicro(microResponse.data);
        console.log(microResponse.data);
      } catch (error) {
        setError("Failed to fetch bitacora data. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerMicros();
  }, [token]);

  return (
    <div className="p-6 bg-slate-300 rounded-lg min-h-screen">
      {/* Search and filter input */}
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

      {/* Table card */}
      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md rounded-lg">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Revision Tecnica de Micros 🚌
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
                <Button onClick={() => table.lastPage()}>Ultima Pagina</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog for assigning revision */}
      {selectedMicro && (
        <DialogDemo
          micro={selectedMicro}
          onClose={() => setSelectedMicro(null)}
        />
      )}
    </div>
  );
}
