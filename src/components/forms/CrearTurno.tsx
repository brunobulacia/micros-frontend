/* "use client";

import { useAuthStore } from "@/store/auth";
import { TurnoData } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { useForm } from "react-hook-form";
import { crearTurno } from "@/api/turno";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export const CrearHorario = () => {
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TurnoData>({
    defaultValues: {
      chofer: "",
      interno: "",
      partida: "",
    },
  });

  const onSubmit = async (data: TurnoData) => {
    setIsSubmitting(true);
    try {
      await crearTurno(data, token);
      toast({
        title: "Éxito",
        description: "Turno iniciado con éxito",
      });
      reset();
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crear Turno</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chofer">Chofer</Label>
            <Input
              id="chofer"
              {...register("chofer", { required: "Este campo es requerido" })}
              placeholder="Ingresa el chofer"
            />
            {errors.chofer && (
              <p className="text-sm text-red-500">{errors.chofer.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="interno">Interno</Label>
            <Input
              id="interno"
              {...register("interno", { required: "Este campo es requerido" })}
              placeholder="Ingresa el interno"
            />
            {errors.interno && (
              <p className="text-sm text-red-500">{errors.interno.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="partida">Punto de Salida</Label>
            <Input
              id="partida"
              {...register("partida", { required: "Este campo es requerido" })}
              placeholder="Punto de salida"
            />
            {errors.partida && (
              <p className="text-sm text-red-500">{errors.partida.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Creando..."
            ) : (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Crear Turno
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CrearHorario;
 */
"use client";

import { useAuthStore } from "@/store/auth";
import { TurnoData } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { useForm } from "react-hook-form";
import { crearTurno } from "@/api/turno";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CrearHorarioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CrearTurno = ({ open, onOpenChange }: CrearHorarioProps) => {
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TurnoData>({
    defaultValues: {
      chofer: "",
      interno: "",
      partida: "",
    },
  });

  const onSubmit = async (data: TurnoData) => {
    setIsSubmitting(true);
    try {
      await crearTurno(data, token);
      toast({
        title: "Éxito",
        description: "Turno iniciado con éxito",
      });
      window.location.reload();
      alert("Turno creado con éxito");
      reset();
      onOpenChange(false); // Close the dialog after successful submission
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Crear Turno</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chofer">Chofer</Label>
            <Input
              id="chofer"
              {...register("chofer", { required: "Este campo es requerido" })}
              placeholder="Ingresa el chofer"
            />
            {errors.chofer && (
              <p className="text-sm text-red-500">{errors.chofer.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="interno">Interno</Label>
            <Input
              id="interno"
              {...register("interno", { required: "Este campo es requerido" })}
              placeholder="Ingresa el interno"
            />
            {errors.interno && (
              <p className="text-sm text-red-500">{errors.interno.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="partida">Punto de Salida</Label>
            <Input
              id="partida"
              {...register("partida", { required: "Este campo es requerido" })}
              placeholder="Punto de salida"
            />
            {errors.partida && (
              <p className="text-sm text-red-500">{errors.partida.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Creando..."
            ) : (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Crear Turno
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CrearTurno;
