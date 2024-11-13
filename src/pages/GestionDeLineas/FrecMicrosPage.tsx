"use client";

import { frecuenciaMicros } from "@/api/turno";
import { useAuthStore } from "@/store/auth";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface FrecuenciaMicrosData {
  token: string;
  partida: "A" | "B";
  frecuencia: number;
}

function FrecMicrosPage() {
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<FrecuenciaMicrosData, "token">>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: Omit<FrecuenciaMicrosData, "token">) => {
    setIsSubmitting(true);
    try {
      const res = await frecuenciaMicros(token, data.partida, data.frecuencia);
      toast({
        title: "Éxito",
        description: "La frecuencia de micros ha sido actualizada.",
      });
      console.log(res);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar la frecuencia de micros.",
        variant: "destructive",
      });
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Actualizar Frecuencia de Micros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              name="partida"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una partida" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Partida A</SelectItem>
                    <SelectItem value="B">Partida B</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.partida && (
              <p className="text-red-500 text-sm mt-1">
                {errors.partida.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="frecuencia"
              control={control}
              rules={{
                required: "Este campo es requerido",
                validate: (value) =>
                  !isNaN(Number(value)) || "Debe ser un número válido",
              }}
              render={({ field }) => (
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Frecuencia"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
            {errors.frecuencia && (
              <p className="text-red-500 text-sm mt-1">
                {errors.frecuencia.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-lg mt-1">{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Actualizar Frecuencia"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FrecMicrosPage;
