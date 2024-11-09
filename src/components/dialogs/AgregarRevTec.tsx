import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { revisionRequest } from "@/api/revision";
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

interface DialogDemoProps {
  micro: MicroItem;
  onClose: () => void;
}

interface FormData {
  token: string;
  interno: string;
  detalle: string;
  estado: string;
  proximaFecha: string;
}

export function DialogDemo({ micro, onClose }: DialogDemoProps) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { token } = useAuthStore();
  // Manejador de envío del formulario
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data); // Mostrar los datos en consola
    try {
      data.token = token;
      data.interno = micro.interno;
      console.log(data);
      const revRes = await revisionRequest(data);
      if (revRes) {
        alert("Revision creada con exito");
        reset();
        onClose();
      } else {
        alert("Error al crear la revision");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Asignar revision al {micro.placa}</DialogTitle>
          <DialogDescription>
            Registrar una revision para el {micro.placa} del dueño{" "}
            {micro.id_dueño}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Campo Detalle */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monto" className="text-right">
                Detalle
              </Label>
              <Input
                id="monto"
                placeholder="Ingrese el detalle"
                className="col-span-3"
                type="text"
                {...register("detalle", { required: true })}
              />
            </div>
            {/* Campo Estado */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estado" className="text-right">
                Estado
              </Label>
              <Input
                id="estado"
                placeholder="Ingrese el estado"
                className="col-span-3"
                type="text"
                {...register("estado", { required: true })}
              />
            </div>
            {/* Fecha Proxima Revision */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">
                Proxima Revision
              </Label>
              <Input
                id="descripcion"
                placeholder="Ingrese la fecha"
                className="col-span-3"
                type="date"
                {...register("proximaFecha", { required: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClose} className="mr-2 hover:bg-red-500">
              Cancelar
            </Button>
            <Button type="submit" className="hover:bg-green-800">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
