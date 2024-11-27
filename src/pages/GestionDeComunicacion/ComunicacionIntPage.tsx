/* import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, Mensaje } from "@/types";
import { MessageCard } from "@/components/cards/messageCard.tsx";
const Chat = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");

  const token = useAuthStore.getState().token;
  const decodedToken: DecodedToken = jwtDecode(token);
  const lineaId = decodedToken.id_linea;
  const usuario = decodedToken.id;
  const rol = decodedToken.role;

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.emit("join-line", lineaId);

    socket.on("nuevo-mensaje", (nuevoMensaje: Mensaje) => {
      setMensajes((prev) => [...prev, nuevoMensaje]);
    });

    return () => {
      socket.disconnect();
    };
  }, [lineaId]);

  const enviarMensaje = () => {
    const nuevoMensaje = {
      emisor: usuario,
      receptor: "chofer123",
      contenido: mensaje,
      id_linea: lineaId,
      rol,
    };
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.emit("enviar-mensaje", nuevoMensaje);
    setMensaje("");
  };

  return (
    <div className="relative">
      <div className="flex flex-col overflow-auto h-[calc(100vh-4rem)] m-4 mb-20">
        {mensajes.map((msg: Mensaje, index) => (
          <MessageCard key={index} mensaje={msg} />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t flex items-center">
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje"
          className="flex-1 mr-2 p-2 border rounded-lg"
        />
        <button
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={enviarMensaje}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
 */
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

interface MensajeItem {
  id_notificacion: string;
  contenido: string;
  usuario_emisor: string;
  usuario_receptor: string;
}

interface CrearMensaje {
  token: string;
  contenido: string;
  destinatario: string;
}

const columnHelper = createColumnHelper<MensajeItem>();

const columns = [
  columnHelper.accessor("contenido", {
    header: "Contenido",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("usuario_receptor", {
    header: "Enviado a: ",
    cell: (info) => info.getValue(),
  }),
];

function CrearMensajeForm({
  onSubmit,
}: {
  onSubmit: (data: CrearMensaje) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearMensaje>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="destinatario">Enviar a:</Label>
        <Input
          id="destinatario"
          type="text"
          {...register("destinatario", { required: "Este campo es requerido" })}
        />
        {errors.destinatario && (
          <span className="text-red-500 text-sm">
            {errors.destinatario.message}
          </span>
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

      <Button type="submit" className="w-full">
        Enviar mensaje
      </Button>
    </form>
  );
}

export default function MensajesPage() {
  const { token } = useAuthStore();
  const [mensaje, setMensaje] = useState<MensajeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const table = useReactTable({
    data: mensaje,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  useEffect(() => {
    async function traerMensajes() {
      try {
        const mensajeRes = null;
        // setNotificacion(notificacionRes.data);
        console.log(mensajeRes);
      } catch (error) {
        setError("Error al traer la bitácora.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerMensajes();
  }, [token]);

  const handleCrearMensaje = async (data: CrearMensaje) => {
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
                Enviar Mensaje
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Mensaje</DialogTitle>
              </DialogHeader>
              <CrearMensajeForm onSubmit={handleCrearMensaje} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-zinc-200 shadow-md rounded-lg overflow-hidden">
          <CardHeader className="border-b border-zinc-200 bg-zinc-100">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-zinc-800">
              Mensajes Enviados
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
