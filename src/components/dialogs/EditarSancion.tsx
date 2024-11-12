import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateEstadoFicha } from "@/api/sancion";

interface DialogUpdateFichaProps {
  ficha: string;
  estado: string;
  token: string;
  onClose: () => void;
}

export function DialogUpdateFicha({
  ficha,
  estado,
  token,
  onClose,
}: DialogUpdateFichaProps) {
  const { handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      ficha,
      estado,
    },
  });

  // Estado local para manejar el valor del Select
  const [selectedEstado, setSelectedEstado] = useState(estado);

  // Función para manejar el cambio de valor en el Select
  const handleEstadoChange = (value: any) => {
    setSelectedEstado(value);
    setValue("estado", value); // `setValue` para actualizar el valor en el formulario
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ficha: data.ficha,
      estado: data.estado,
      token,
    };
    const res = await updateEstadoFicha(payload);
    console.log("Payload:", payload);
    if (res) {
      alert("Ficha actualizada con éxito");
    }
    reset();
    window.location.reload();
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="md:max-w-lg bg-slate-200 rounded-lg w-3/4">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar Ficha</DialogTitle>
          <DialogDescription className="text-base">
            Actualiza el estado de la ficha seleccionada.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Label htmlFor="estado" className="text-lg">
              Estado
            </Label>
            <Select value={selectedEstado} onValueChange={handleEstadoChange}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="Pagada">Pagada</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Anulada">Anulada</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4">
              Actualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
