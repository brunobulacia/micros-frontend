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
import { crearSancion } from "@/api/sancion";
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

export function DialogDemo({ chofer, onClose }: DialogDemoProps) {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();
  const { token } = useAuthStore();
  // Manejador de envío del formulario
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data); // Mostrar los datos en consola
    try {
      data.token = token;
      data.chofer = chofer.usuario;
      console.log(data);
      const fichaRes = await crearSancion(data);
      if (fichaRes) {
        alert("Ficha creada con exito");
        reset(); // Resetear el formulario después de enviar los datos
        onClose(); // Cerrar el diálogo
      } else {
        alert("Error al crear la ficha");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Registrar cambios en el campo 'tipo' para el select personalizado
  const tipoSeleccionado = watch("tipo");
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
            {/* Campo Monto */}
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
            {/* Campo Descripción */}
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
            {/* Campo Tipo */}
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
                    <SelectItem value="Velocidad">Velocidad</SelectItem>
                    <SelectItem value="Revisión técnica pendiente">
                      Revisión técnica pendiente
                    </SelectItem>
                    <SelectItem value="Retraso en hora de llegada">
                      Retraso en hora de llegada
                    </SelectItem>
                    <SelectItem value="Exceso de velocidad">
                      Exceso de velocidad
                    </SelectItem>
                    <SelectItem value="Estacionamiento incorrecto">
                      Estacionamiento incorrecto
                    </SelectItem>
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
