"use client";

import { useForm } from "react-hook-form";
import { Bus } from "lucide-react";
import { crearMicro } from "../api/micro";
import { handleAxiosError } from "@/utils/handleErrors";
import { MicroData } from "@/types";

function CrearMicro({ linea: linea }: { linea: number }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      placa: "",
      interno: "",
      modelo: "",
      año: 1900,
      seguro: "",
      linea: linea,
      dueño: 0,
    },
  });

  const onSubmit = async (data: MicroData) => {
    const payload = {
      ...data,
    };

    try {
      const res = await crearMicro(payload);
      console.log(res);
      console.log("Payload:", payload);
      reset();
    } catch (error) {
      handleAxiosError(error); //Bruno si lees esto usa esta mamada para ver mejor los errores en la consola del navegador
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">
        REGISTRAR MICRO - Línea {linea}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Placa"
          {...register("placa", { required: "La placa es obligatoria" })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.placa && <p className="text-red-500">{errors.placa.message}</p>}

        <input
          type="text"
          placeholder="Interno"
          {...register("interno", {
            required: "El número interno es obligatorio",
          })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.interno && (
          <p className="text-red-500">{errors.interno.message}</p>
        )}

        <input
          type="text"
          placeholder="Modelo"
          {...register("modelo", { required: "El modelo es obligatorio" })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.modelo && (
          <p className="text-red-500">{errors.modelo.message}</p>
        )}

        <input
          type="text"
          placeholder="Año"
          {...register("año", {
            required: "El año es obligatorio",
            valueAsNumber: false,
          })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.ano && <p className="text-red-500">{errors.ano.message}</p>}

        <input
          type="text"
          placeholder="Seguro"
          {...register("seguro", { required: "El seguro es obligatorio" })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.seguro && (
          <p className="text-red-500">{errors.seguro.message}</p>
        )}
        <input
          type="number"
          placeholder="Dueño"
          {...register("dueño", { required: "El seguro es obligatorio" })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.dueño && (
          <p className="text-red-500">{errors.dueño.message}</p>
        )}
        <button
          type="submit"
          className="bg-black text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
        >
          <Bus className="w-6 h-6 mr-2" />
          <span>Registrar Micro</span>
        </button>
      </form>
    </div>
  );
}

export default CrearMicro;
