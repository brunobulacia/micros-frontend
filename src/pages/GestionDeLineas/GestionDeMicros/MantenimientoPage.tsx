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
import { getMantenimientos } from "@/api/mantenimiento";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { MantPDFDocument } from "@/pages/GestionDeLineas/GestionDeMicros/reportes/MantPDF";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface micro {
  interno: string;
  placa: string;
}

interface MantItem {
  id_mantenimiento: string;
  fecha: string;
  descripcion: string;
  id_micro: string;
  micro: micro;
}

function FiltrarMant({ onSubmit }: { onSubmit: (data: MantItem) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MantItem>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fecha" className="text-right">
          Fecha
        </Label>
        <Input
          id="fecha"
          type="date"
          {...register("fecha", { required: "Este campo es requerido" })}
        />
        {errors.fecha && (
          <span className="text-red-500 text-sm">{errors.fecha.message}</span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="descripcion" className="text-right">
          Descripcion
        </Label>
        <Input
          id="descripcion"
          placeholder="Ingrese la descripcion"
          className="col-span-3"
          type="text"
          {...register("descripcion", { required: false })}
        />
      </div>

      <Button type="submit" className="w-full">
        Filtrar
      </Button>
    </form>
  );
}

const columnHelper = createColumnHelper<MantItem>();

export default function Mantenimiento() {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [mantenimientos, setMantenimientos] = useState<MantItem[]>([]);
  const [mantFiltrado, setMantFiltrado] = useState<MantItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    columnHelper.accessor("fecha", {
      header: "Fecha",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("descripcion", {
      header: "Descripción",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("micro.placa", {
      header: "Placa",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("micro.interno", {
      header: "Interno",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: mantFiltrado.length > 0 ? mantFiltrado : mantenimientos, // Usamos mantFiltrado si está disponible
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    async function traerMicros() {
      try {
        setIsLoading(true);
        const mantResponse = await getMantenimientos();
        console.log(mantResponse);
        setMantenimientos(mantResponse.data);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los mantenimientos.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerMicros();
  }, [token]);

  const handleFiltrar = async (data: MantItem) => {
    try {
      // Filtrar los mantenimientos utilizando los datos del formulario (data)
      const mantFiltr = mantenimientos.filter(
        (item) =>
          (!data.fecha || item.fecha.includes(data.fecha)) && // Filtra por fecha si se proporciona
          (!data.descripcion || item.descripcion.includes(data.descripcion)) // Filtra por descripción si se proporciona
      );

      // Actualiza el estado de los mantenimientos filtrados
      setMantFiltrado(mantFiltr);
      setIsDialogOpen(false); // Cierra el diálogo al completar el filtrado
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-slate-300 rounded-lg min-h-screen">
      <div className="max-w-4xl mx-auto flex mb-8 flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center w-full">
          <div className="relative w-full bg-slate-300">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 bg-white"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto bg-blue-800">
              Generar Reporte
            </Button>
          </DialogTrigger>
          {mantFiltrado.length > 0 && (
            <Button className="w-full md:w-auto bg-blue-800">
              <PDFDownloadLink
                document={<MantPDFDocument mantFiltrados={mantFiltrado} />}
                fileName="reporte_sanciones.pdf"
              >
                <Button className="w-full md:w-auto bg-blue-800">
                  Descargar Reporte
                </Button>
              </PDFDownloadLink>
            </Button>
          )}

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generar Reporte</DialogTitle>
            </DialogHeader>
            <FiltrarMant onSubmit={handleFiltrar} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md rounded-lg">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Mantenimiento de Micros 🛠️
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
