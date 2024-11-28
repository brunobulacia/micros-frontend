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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface IncidenteItem {
  id_incidente: string;
  hora: string;
  descripcion: string;
  tipo: string;
  estado: string;
  turno: string;
}

interface CrearIncidente {
  token: string;
  hora: string;
  descripcion: string;
  tipo: string;
  estado: string;
  turno: string;
}

const columnHelper = createColumnHelper<IncidenteItem>();

const columns = [
  columnHelper.accessor("hora", {
    header: "Hora",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("descripcion", {
    header: "Descripcion",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tipo", {
    header: "Tipo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("estado", {
    header: "Estado",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("turno", {
    header: "Turno",
    cell: (info) => info.getValue(),
  }),
];

function CrearIncidenteForm({
  onSubmit,
}: {
  onSubmit: (data: CrearIncidente) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearIncidente>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="hora">Hora</Label>
        <Input
          id="hora"
          type="time"
          {...register("hora", { required: "Este campo es requerido" })}
        />
        {errors.hora && (
          <span className="text-red-500 text-sm">{errors.hora.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="tipo">Tipo</Label>
        <Input
          id="tipo"
          type="text"
          {...register("tipo", { required: "Este campo es requerido" })}
        />
        {errors.tipo && (
          <span className="text-red-500 text-sm">{errors.tipo.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="descripcion">Contenido</Label>
        <Textarea
          id="descripcion"
          {...register("descripcion", { required: "Este campo es requerido" })}
        />
        {errors.descripcion && (
          <span className="text-red-500 text-sm">
            {errors.descripcion.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="estado">Estado</Label>
        <Input
          id="estado"
          type="text"
          {...register("estado", { required: "Este campo es requerido" })}
        />
        {errors.estado && (
          <span className="text-red-500 text-sm">{errors.estado.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="turno">Turno</Label>
        <Input
          id="turno"
          type="text"
          {...register("turno", { required: "Este campo es requerido" })}
        />
        {errors.turno && (
          <span className="text-red-500 text-sm">{errors.turno.message}</span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Registrar
      </Button>
    </form>
  );
}

export default function IncidentesPage() {
  const { token } = useAuthStore();
  const [incidente, setIncidente] = useState<IncidenteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const table = useReactTable({
    data: incidente,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerIncidentes() {
      try {
        const incidenteRes = null;
        // setNotificacion(notificacionRes.data);
        console.log(incidenteRes);
      } catch (error) {
        setError("Error al mostrar los incidentes.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerIncidentes();
  }, [token]);

  const handleCrearIncidente = async (data: CrearIncidente) => {
    try {
      data.token = token;
      // const res = await crearHorario(data);
      // console.log(res);
      alert(JSON.stringify(data));
      alert("Horario creado con exito");
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-slate-300 rounded-lg min-h-screen">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 bg-white"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-blue-800">
                Registrar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Registrar nuevo incidente</DialogTitle>
              </DialogHeader>
              <CrearIncidenteForm onSubmit={handleCrearIncidente} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-zinc-200 shadow-md rounded-lg overflow-hidden">
          <CardHeader className="border-b border-zinc-200 bg-zinc-100">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-zinc-800">
              Lista de incidentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {error && (
              <Alert variant="destructive" className="mb-4 sm:mb-6">
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
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
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
                        className="border-b border-zinc-200 bg-white even:bg-zinc-100"
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
            )}
            <div className="flex flex-wrap justify-between gap-2 mt-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}