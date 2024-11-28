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

//LIBRERIAS PARA VERIFICAR EL TOKEN DEL USUARIO Y OBTENER SUS DATOS
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";
import { getComentarios, crearComentario } from "@/api/comentarios";

interface ComentarioItem {
  id_comentario: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo_comentario: string;
  usuario: string;
  id_linea: string;
}

interface CrearComentario {
  token: string;
  titulo: string;
  descripcion: string;
  tipo_comentario: string;
  id_linea: number;
}

const columnHelper = createColumnHelper<ComentarioItem>();

const columns = [
  columnHelper.accessor("titulo", {
    header: "Titulo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("descripcion", {
    header: "Descripcion",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fecha", {
    header: "Fecha",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tipo_comentario", {
    header: "Tipo de comentario",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id_linea", {
    header: "Linea",
    cell: (info) => info.getValue(),
  }),
];

function CrearComentarioForm({
  onSubmit,
}: {
  onSubmit: (data: CrearComentario) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearComentario>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="titulo">Titulo</Label>
        <Input
          id="titulo"
          type="text"
          {...register("titulo", { required: "Este campo es requerido" })}
        />
        {errors.titulo && (
          <span className="text-red-500 text-sm">{errors.titulo.message}</span>
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
        <Label htmlFor="tipo_comentario">Tipo comentario</Label>
        <Input
          id="tipo_comentario"
          type="text"
          {...register("tipo_comentario", {
            required: "Este campo es requerido",
          })}
        />
        {errors.tipo_comentario && (
          <span className="text-red-500 text-sm">
            {errors.tipo_comentario.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="id_linea">Linea</Label>
        <Input
          id="id_linea"
          type="text"
          {...register("id_linea", { required: "Este campo es requerido" })}
        />
        {errors.id_linea && (
          <span className="text-red-500 text-sm">
            {errors.id_linea.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Registrar
      </Button>
    </form>
  );
}

export default function RetroPage() {
  const { token } = useAuthStore();
  const [comentario, setComentario] = useState<ComentarioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const decoded = jwtDecode(token) as DecodedToken;
  const { id_linea } = decoded;

  const table = useReactTable({
    data: comentario,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerComentarios() {
      try {
        const comentarioRes = await getComentarios(token, id_linea);
        setComentario(comentarioRes.data);
        console.log(comentarioRes);
      } catch (error) {
        setError("Error al mostrar los comentarios.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerComentarios();
  }, [token]);

  const handleCrearComentario = async (data: CrearComentario) => {
    try {
      data.token = token;
      const res = await crearComentario(data);
      console.log(data);
      if (res) {
        alert("Comentario enviado con exito");
        window.location.reload();
      }
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
                Contactar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contactate con nosotros</DialogTitle>
              </DialogHeader>
              <CrearComentarioForm onSubmit={handleCrearComentario} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-zinc-200 shadow-md rounded-lg overflow-hidden">
          <CardHeader className="border-b border-zinc-200 bg-zinc-100">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-zinc-800">
              Lista de mensajes
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
