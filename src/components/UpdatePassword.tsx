"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { updatePassword } from "@/api/auth";
import { handleAxiosError } from "@/utils/handleErrors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { updatePasswordData } from "@/types";

export function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<updatePasswordData>();

  const onSubmit: SubmitHandler<updatePasswordData> = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updatePassword(
        data.contraseña,
        data.nueva_contraseña,
        token
      );
      setSuccess(true);
      reset();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("nueva_contraseña");

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-700 dark:text-zinc-200">
        Actualizar Contraseña
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="contraseña"
            className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300"
          >
            Contraseña Actual
          </Label>
          <Input
            id="contraseña"
            type="password"
            placeholder="Ingresa tu contraseña actual"
            {...register("contraseña", {
              required: "La contraseña actual es requerida",
            })}
            className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200"
          />
          {errors.contraseña && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.contraseña.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="nueva_contraseña"
            className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300"
          >
            Nueva Contraseña
          </Label>
          <Input
            id="nueva_contraseña"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            {...register("nueva_contraseña", {
              required: "La nueva contraseña es requerida",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200"
          />
          {errors.nueva_contraseña && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.nueva_contraseña.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmar_contraseña"
            className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300"
          >
            Confirmar Nueva Contraseña
          </Label>
          <Input
            id="confirmar_contraseña"
            type="password"
            placeholder="Confirma tu nueva contraseña"
            {...register("confirmar_contraseña", {
              required: "Por favor, confirma tu nueva contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200"
          />
          {errors.confirmar_contraseña && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.confirmar_contraseña.message}
            </p>
          )}
        </div>

        <Button
          className="w-full text-base sm:text-lg text-zinc-100 dark:text-zinc-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Contraseña"}
        </Button>
      </form>

      {success && (
        <Alert variant="default">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Éxito</AlertTitle>
          <AlertDescription>
            Tu contraseña ha sido actualizada correctamente.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
