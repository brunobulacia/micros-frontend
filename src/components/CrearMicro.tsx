"use client";

import { useForm } from "react-hook-form";
import { Bus } from "lucide-react";
import { useAuthStore } from "../store/auth";
import { crearMicro } from "../api/micro";

function CrearMicro({ linea }) {
  const { token } = useAuthStore();
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
      año: "",
      seguro: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      linea,
      token,
    };

    try {
      const res = await crearMicro(payload);
      console.log(res);
      console.log("Payload:", payload);
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
          type="number"
          placeholder="Año"
          {...register("año", {
            required: "El año es obligatorio",
            valueAsNumber: true,
            min: { value: 1900, message: "Año no válido" },
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
