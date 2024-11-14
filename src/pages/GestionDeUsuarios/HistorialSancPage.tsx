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
import { AlertCircle, Search, SquarePen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSanciones } from "@/api/sancion";
import { DialogUpdateFicha } from "@/components/dialogs/EditarSancion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FichaPDFDocument } from "./reportes/FichaPDF";
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

interface editarFicha {
  ficha: string;
  estado: string;
  token: string;
}

const columnHelper = createColumnHelper<FichaItem>();

function FiltrarFichaForm({
  onSubmit,
}: {
  onSubmit: (data: FichaItem) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FichaItem>();

  const handleEstadoChange = (value: string) => {
    setValue("estado", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="monto" className="text-right">
          Monto
        </Label>
        <Input
          id="monto"
          type="number"
          className="w-[180px]"
          {...register("monto", { required: "Este campo es requerido" })}
        />
        {errors.monto && (
          <span className="text-red-500 text-sm">{errors.monto.message}</span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tipo" className="text-right">
          Estado
        </Label>
        <Select onValueChange={handleEstadoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estados</SelectLabel>
              <SelectItem value="Pagada">Pagada</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
          {...register("descripcion", { required: true })}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="" className="text-right">
          Chofer
        </Label>
        <Input
          id="usuario_chofer"
          placeholder="Ingrese el nombre del chofer"
          className="col-span-3"
          type="text"
          {...register("usuario_chofer", { required: true })}
        />
      </div>
      <Button type="submit" className="w-full">
        Filtrar
      </Button>
    </form>
  );
}

export default function HistorialSancPage() {
  const { token } = useAuthStore();
  const [ficha, setFicha] = useState<FichaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [updateFicha, setUpdateFicha] = useState<editarFicha | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fichasFiltradas, setFichasFiltradas] = useState<FichaItem[]>([]);

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
    columnHelper.display({
      id: "editar",
      header: "Editar",
      cell: ({ row }) => (
        <Button
          className="bg-blue-800 hover:bg-black text-white"
          onClick={() => handleEditar(row.original)}
        >
          <SquarePen />
        </Button>
      ),
    }),
  ];

  const handleEditar = (ficha: FichaItem) => {
    setUpdateFicha({ ficha: ficha.id_ficha, estado: ficha.estado, token });
  };

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
      } catch (error) {
        setError("No se pudo extraer el historial de fichas.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    traerFichas();
  }, [token]);

  const handleFiltrar = async (data: FichaItem) => {
    try {
      console.log(ficha);
      const fichasFiltradas = ficha.filter(
        (item) =>
          (!data.estado || item.estado === data.estado) &&
          (!data.descripcion || item.descripcion.includes(data.descripcion)) &&
          (!data.monto || item.monto === data.monto) &&
          (!data.usuario_chofer ||
            item.usuario_chofer.includes(data.usuario_chofer))
      );
      console.log(ficha);
      setFichasFiltradas(fichasFiltradas);
      setIsDialogOpen(false);
      console.log(fichasFiltradas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-slate-300 rounded-lg min-h-screen">
      {/* Contenedor del input y botón con estilos alineados */}
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
          {fichasFiltradas.length > 0 && (
            <Button className="w-full md:w-auto bg-blue-800">
              <PDFDownloadLink
                document={
                  <FichaPDFDocument fichasFiltradas={fichasFiltradas} />
                }
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
            <FiltrarFichaForm onSubmit={handleFiltrar} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md rounded-lg ">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Historial de Sanciones
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
                {table.getPageCount() > 1 && (
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

      {/* Renderiza el diálogo solo si updateFicha tiene datos */}
      {updateFicha && (
        <DialogUpdateFicha
          ficha={updateFicha.ficha}
          estado={updateFicha.estado}
          token={updateFicha.token}
          onClose={() => setUpdateFicha(null)}
        />
      )}
    </div>
  );
}
