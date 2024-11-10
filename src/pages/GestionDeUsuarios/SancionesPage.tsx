// SancionesPage.tsx
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
import { choferRes } from "@/api/chofer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogDemo } from "@/components/dialogs/FichaSancionForm";

interface ChoferItem {
  usuario: string;
  licencia_categoria: string;
  nombre: string;
  apellido: string;
  correo: string;
  sexo: string;
  carnet: string;
  telefonos: [string];
}

const columnHelper = createColumnHelper<ChoferItem>();

export default function SancionesPage() {
  const { token } = useAuthStore();
  const [chofer, setChofer] = useState<ChoferItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  const [selectedChofer, setSelectedChofer] = useState<ChoferItem | null>(null); // State to store selected chofer data

  const columns = [
    columnHelper.accessor("carnet", {
      header: "Carnet",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("licencia_categoria", {
      header: "Licencia",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nombre", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apellido", {
      header: "Apellido",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("correo", {
      header: "Correo",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "sancionar",
      header: "Sancionar",
      cell: ({ row }) => (
        <Button
          className="bg-zinc-800 hover:bg-red-600 text-white w-full"
          onClick={() => handleMultar(row.original)}
        >
          Multar
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: chofer,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  const handleMultar = (chofer: ChoferItem) => {
    console.log("Multar chofer:", chofer);
    setSelectedChofer(chofer); // Set the selected chofer
    setShowDialog(true); // Show the dialog
  };

  useEffect(() => {
    async function traerChoferes() {
      try {
        const choferResponse = await choferRes(token);
        setChofer(choferResponse.data.listaDeChoferes);
        console.log(choferResponse.data.listaDeChoferes);
      } catch (error) {
        setError("No se pudo obtener la informacion de los choferes.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerChoferes();
  }, [token]);

  return (
    <div className="p-6 min-h-screen bg-slate-300 rounded-lg">
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
            Choferes
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

      {/* Dialog component */}
      {showDialog && selectedChofer && (
        <DialogDemo
          chofer={selectedChofer}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
