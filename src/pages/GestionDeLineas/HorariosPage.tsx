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
import { getHorarios, crearHorario } from "@/api/turno";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface CrearHorario {
  token: string;
  hora_salida: string;
  hora_llegada: string;
}

interface HorarioItem {
  id_horario: string;
  hora_salida: string;
  hora_llegada_aproximada: string;
  usuario_operador: string;
}

const columnHelper = createColumnHelper<HorarioItem>();

function CrearHorarioForm({
  onSubmit,
}: {
  onSubmit: (data: CrearHorario) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearHorario>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="hora_salida">Hora de Salida</Label>
        <Input
          id="hora_salida"
          type="time"
          {...register("hora_salida", { required: "Este campo es requerido" })}
        />
        {errors.hora_salida && (
          <span className="text-red-500 text-sm">
            {errors.hora_salida.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="hora_llegada">Hora de Llegada Aproximada</Label>
        <Input
          id="hora_llegada"
          type="time"
          {...register("hora_llegada", { required: "Este campo es requerido" })}
        />
        {errors.hora_llegada && (
          <span className="text-red-500 text-sm">
            {errors.hora_llegada.message}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Crear Horario
      </Button>
    </form>
  );
}

export default function Horarios() {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [horario, setHorario] = useState<HorarioItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    columnHelper.accessor("hora_salida", {
      header: "Hora Salida",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("hora_llegada_aproximada", {
      header: "Hora Llegada",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: horario,
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
    async function traerHorarios() {
      try {
        setIsLoading(true);
        const horResponse = await getHorarios(token);
        console.log(horResponse);
        setHorario(horResponse.data);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los turnos.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerHorarios();
  }, [token]);

  const handleCrearHorario = async (data: CrearHorario) => {
    try {
      data.token = token;
      const res = await crearHorario(data);
      console.log(res);
      alert("Horario creado con exito");
      setIsDialogOpen(false);
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
              Crear Horario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Horario</DialogTitle>
            </DialogHeader>
            <CrearHorarioForm onSubmit={handleCrearHorario} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table card */}
      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md rounded-lg">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            HORARIOS 📅
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
