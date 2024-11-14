// CrearSancion.tsx
import { useState, useEffect } from "react";
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
import { crearTipoSancion } from "@/api/sancion";
import { useForm, SubmitHandler } from "react-hook-form";

interface tipoSancion {
  token: string;
  tipo: string;
}

interface DialogCrearProps {
  onClose: () => void;
}

export function DialogCrearTipo({ onClose }: DialogCrearProps) {
  const [token, setToken] = useState<string | undefined>();
  const { token: authToken } = useAuthStore();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tipoSancion>();

  // Set the token in the state when authToken changes
  useEffect(() => {
    setToken(authToken);
  }, [authToken]);

  // Handle the form submission
  const onSubmit: SubmitHandler<tipoSancion> = async (data) => {
    if (!token) {
      alert("No se pudo obtener la información necesaria.");
      return;
    }
    data.token = token;
    console.log(data);
    await crearTipoSancion(data);
    alert("Tipo de sanción creado con exito");
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Tipo de Sancion</DialogTitle>
          <DialogDescription>
            Introduzca el tipo de sanción que desea crear
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipo" className="text-right">
              Tipo
            </Label>
            <Input
              id="tipo"
              placeholder="Ingrese el tipo de sanción"
              {...register("tipo", {
                required: "El tipo de sanción es obligatorio",
              })}
              className="col-span-3"
            />
            {errors.tipo && (
              <span className="text-red-500 text-sm">
                {errors.tipo.message}
              </span>
            )}
          </div>
          <DialogFooter>
            <Button className="hover:bg-green-600" type="submit">
              Confirmar Creacion
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
