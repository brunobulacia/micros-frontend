// EditarSancion.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { deleteUserRequest } from "@/api/auth";
import { useNavigate } from "react-router-dom";

interface DialogEliminarCuentaProps {
  usuario: string | undefined;
  correo: string | undefined;
}

export function DialogEliminarCuenta({
  usuario,
  correo,
}: DialogEliminarCuentaProps) {
  const [inputValue, setInputValue] = useState("");
  const [token, setToken] = useState<string | undefined>();
  const navigate = useNavigate();
  const { token: authToken } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Guardamos el token en un estado local para asegurar que esté definido.
    setToken(authToken);
  }, [authToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = async () => {
    if (!token || !usuario || !correo) {
      alert(
        "No se pudo obtener la información necesaria para eliminar la cuenta."
      );
      return;
    }

    if (inputValue === `borrar/${usuario}`) {
      // Llamamos a la API solo si el token y el usuario están disponibles.
      const res = await deleteUserRequest({ token, usuario, correo });
      console.log(res);
      alert("Cuenta eliminada con éxito.");
      logout();
      navigate("/");
    } else {
      alert("La entrada no coincide. Por favor, intente de nuevo.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white pt-3 pb-3 pl-4 pr-4 rounded-lg inline-block">
          <Button variant="destructive">Eliminar Cuenta</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Cuenta</DialogTitle>
          <DialogDescription>
            Para confirmar, escriba "borrar/{usuario}" en la caja de abajo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm" className="text-right">
              Confirmación
            </Label>
            <Input
              id="confirm"
              placeholder={`borrar/${usuario}`}
              value={inputValue}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
