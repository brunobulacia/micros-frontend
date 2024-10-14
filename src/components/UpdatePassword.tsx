import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { updatePassword } from "@/api/auth";
import { handleAxiosError } from "@/utils/handleErrors";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updatePasswordData } from "@/types";

export const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<updatePasswordData>();

  const onSubmit: SubmitHandler<updatePasswordData> = async (data) => {
    setLoading(true); // Habilita el loading
    console.log(data);
    try {
      const res = await updatePassword(
        data.contraseña,
        data.nueva_contraseña,
        token
      );
      console.log(res.data);
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false); // Deshabilita el loading cuando la petición termina
    }
  };
  const password = watch("nueva_contraseña");

  return (
    <div>
      <h1 className="mt-2 mb-1 text-3xl font-semibold">
        {" "}
        ACTUALIZAR CONTRASEÑA{" "}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md w-[90%]"
      >
        <div className="space-y-1 m-2 mr-10">
          <div className="w-full md:w-1/3 flex flex-col">
            <label htmlFor="contraseña" className="text-base font-medium mr-5">
              Contraseña
            </label>
            <Input
              id="contraseña"
              type="password"
              placeholder="Ingresa tu contraseña actual"
              required
              className="h-10 text-base p-2"
              {...register("contraseña", {
                required: "Contraseña es requerida",
              })}
            />
          </div>
          <div className="space-y-1 flex flex-col md:flex-row mt-16">
            <div className="mr-10 w-full md:w-1/3 flex flex-col">
              <label htmlFor="contraseña" className="text-base font-medium">
                Nueva contraseña
              </label>
              <Input
                id="nueva_contraseña"
                type="password"
                placeholder="Ingresa tu contraseña nueva"
                required
                className="h-10 text-base p-2"
                {...register("nueva_contraseña", {
                  required: "Contraseña es requerida",
                })}
              />
            </div>
            <div className="w-full md:w-1/3 flex flex-col m-0">
              <label
                htmlFor="confirmar_contraseña"
                className="text-base sm:text-base font-semibold"
              >
                Confirmar Contraseña
              </label>
              <Input
                id="confirmar_contraseña"
                type="password"
                placeholder="Ingresa tu contraseña de nuevo"
                {...register("confirmar_contraseña", {
                  required: "Este campo es requerido",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
                className="h-10 text-base p-2"
              />
              {errors.confirmar_contraseña && (
                <p className="text-xs sm:text-base text-red-500">
                  {errors.confirmar_contraseña.message}
                </p>
              )}
            </div>
          </div>
          <Button
            className="w-full md:w-1/3 h-10"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Actualizar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
