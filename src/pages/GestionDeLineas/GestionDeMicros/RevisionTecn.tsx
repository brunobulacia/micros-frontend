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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RevisionPDF } from "@/pages/GestionDeLineas/GestionDeMicros/reportes/RevisionPDF";

// Interfaces
interface Estado {
  id_estado: string;
  estado: string;
  fecha: string;
  hora: string;
  id_micro: string;
}

interface InformacionesPersonales {
  nombre: string;
}

interface Dueño {
  id: string;
  id_informacion: string;
  informaciones_personale: InformacionesPersonales;
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
  dueño: Dueño;
}

function FiltrarFichaForm({
  onSubmit,
}: {
  onSubmit: (data: MicroItem) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MicroItem>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="año" className="text-right">
          Año
        </Label>
        <Input
          id="año"
          type="text"
          {...register("año", { required: "Este campo es requerido" })}
        />
        {errors.año && (
          <span className="text-red-500 text-sm">{errors.año.message}</span>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="modelo" className="text-right">
          Modelo
        </Label>
        <Input
          id="modelo"
          placeholder="Ingrese el modelo"
          className="col-span-3"
          type="text"
          {...register("modelo", { required: true })}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="Seguro" className="text-right">
          Seguro
        </Label>
        <Input
          id="seguro"
          placeholder="Ingrese el seguro"
          className="col-span-3"
          type="text"
          {...register("seguro", { required: true })}
        />
      </div>
      <Button type="submit" className="w-full">
        Filtrar
      </Button>
    </form>
  );
}

const columnHelper = createColumnHelper<MicroItem>();

export default function Revision() {
  const { token } = useAuthStore();
  const [micro, setMicro] = useState<MicroItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtering, setFiltering] = useState("");
  const [selectedMicro, setSelectedMicro] = useState<MicroItem | null>(null);
  const [revFiltradas, setrevFiltradas] = useState<MicroItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    columnHelper.accessor("dueño.informaciones_personale.nombre", {
      header: "Dueño",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "revision",
      header: "Revision",
      cell: ({ row }) => (
        <Button
          className="bg-blue-800 hover:bg-black text-white"
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
        setError("No existen revisiones.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    traerMicros();
  }, [token]);

  const handleFiltrar = async (data: MicroItem) => {
    try {
      console.log(data);
      const revFiltradas = micro.filter(
        (item) =>
          (!data.año || item.año === data.año) &&
          (!data.modelo || item.modelo.includes(data.modelo)) &&
          (!data.seguro || item.seguro.includes(data.seguro))
      );
      setrevFiltradas(revFiltradas);
      setIsDialogOpen(false);
      console.log(revFiltradas);
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
          {revFiltradas.length > 0 && (
            <Button className="w-full md:w-auto bg-blue-800">
              <PDFDownloadLink
                document={<RevisionPDF revFiltradas={revFiltradas} />}
                fileName="reporte_sanciones.pdf"
              >
                {({ loading }) => (
                  <Button className="w-full md:w-auto bg-blue-800">
                    {loading ? "Generando PDF..." : "Descargar Reporte"}
                  </Button>
                )}
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
