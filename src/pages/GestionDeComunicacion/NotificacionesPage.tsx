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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NotificacionItem {
  id_notificacion: string;
  tipo: string;
  contenido: string;
}

interface CrearNotificacion {
  token: string;
  tipo: string;
  contenido: string;
  destinatario: string;
}

const columnHelper = createColumnHelper<NotificacionItem>();

const columns = [
  columnHelper.accessor("tipo", {
    header: "Tipo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("contenido", {
    header: "Contenido",
    cell: (info) => info.getValue(),
  }),
];

function CrearNotificacionForm({
  onSubmit,
}: {
  onSubmit: (data: CrearNotificacion) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearNotificacion>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <Label htmlFor="contenido">Contenido</Label>
        <Textarea
          id="contenido"
          {...register("contenido", { required: "Este campo es requerido" })}
        />
        {errors.contenido && (
          <span className="text-red-500 text-sm">
            {errors.contenido.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="destinatario">Destinatario</Label>
        <Select
          {...register("destinatario", { required: "Este campo es requerido" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un destinatario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Choferes">Choferes</SelectItem>
            <SelectItem value="Usuarios">Usuarios</SelectItem>
            <SelectItem value="Todos">Todos</SelectItem>
          </SelectContent>
        </Select>
        {errors.destinatario && (
          <span className="text-red-500 text-sm">
            {errors.destinatario.message}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Enviar Notificación
      </Button>
    </form>
  );
}

export default function NotificacionesPage() {
  const { token } = useAuthStore();
  const [notificacion, setNotificacion] = useState<NotificacionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const table = useReactTable({
    data: notificacion,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerNotificaciones() {
      try {
        const notificacionRes = null;
        // setNotificacion(notificacionRes.data);
        console.log(notificacionRes);
      } catch (error) {
        setError("Error al traer la bitácora.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerNotificaciones();
  }, [token]);

  const handleCrearNotificacion = async (data: CrearNotificacion) => {
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
                Enviar Notificacion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Notificacion</DialogTitle>
              </DialogHeader>
              <CrearNotificacionForm onSubmit={handleCrearNotificacion} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-zinc-200 shadow-md rounded-lg overflow-hidden">
          <CardHeader className="border-b border-zinc-200 bg-zinc-100">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-zinc-800">
              Lista de Notificaciones
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
