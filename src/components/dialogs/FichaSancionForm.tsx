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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/auth";
import { crearSancion, getTiposSancion } from "@/api/sancion";
import { useEffect, useState } from "react";

interface ChoferItem {
  usuario: string;
  licencia_categoria: string;
  nombre: string;
  apellido: string;
  correo: string;
  sexo: string;
  carnet: string;
  telefonos: [string];
}

interface DialogDemoProps {
  chofer: ChoferItem;
  onClose: () => void;
}

interface FormData {
  chofer: string;
  monto: number;
  estado: string;
  descripcion: string;
  tipo: string;
  token: string;
}

interface tipoSanc {
  id: number;
  tipo: string;
}

export function DialogDemo({ chofer, onClose }: DialogDemoProps) {
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const { token } = useAuthStore();
  const [tiposSancion, setTiposSancion] = useState<tipoSanc[]>([]);
  useEffect(() => {
    async function fetchTiposSancion() {
      try {
        const tipos = await getTiposSancion(token);
        setTiposSancion(tipos.data);
        console.log("tipos de sanción recibidos:", tiposSancion);
      } catch (error) {
        console.error("Error al cargar los tipos de sanción:", error);
      }
    }
    console.log(tiposSancion);
    fetchTiposSancion();
  }, [token]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      data.token = token;
      data.chofer = chofer.usuario;
      console.log("Datos del formulario:", data);
      const fichaRes = await crearSancion(data);
      if (fichaRes) {
        alert("Ficha creada con éxito");
        reset();
        onClose();
      } else {
        alert("Error al crear la ficha");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const handleEstadoChange = (value: string) => {
    setValue("estado", value);
  };

  const handleTipoChange = (value: string) => {
    setValue("tipo", value);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Multar a {chofer.nombre}</DialogTitle>
          <DialogDescription>
            Registrar una multa para el chofer {chofer.nombre} {chofer.apellido}
            .
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monto" className="text-right">
                Monto
              </Label>
              <Input
                id="monto"
                placeholder="Ingrese el monto"
                className="col-span-3"
                type="number"
                {...register("monto", { required: true, valueAsNumber: true })}
              />
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
              <Label htmlFor="tipo" className="text-right">
                Ficha
              </Label>
              <Select onValueChange={handleTipoChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
                    {tiposSancion.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.tipo}>
                        {tipo.tipo}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
