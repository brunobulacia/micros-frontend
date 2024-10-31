"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Bus } from "lucide-react";
import { crearMicro } from "../api/micro";
import { getOwners } from "../api/owners.ts"; // Importa la función para obtener la lista de dueños
import { handleAxiosError } from "@/utils/handleErrors";
export interface MicroData {
  placa: string;
  interno: string;
  modelo: string;
  año: number;
  seguro: string;
  linea: number;
  dueño: string;
}

interface Owner {
  id: string;
  nombre: string;
  apellido: string;
}

function CrearMicro({ linea }: { linea: number }) {
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
      dueño: "", // Cambiado a una cadena vacía para almacenar el id del dueño seleccionado
    },
  });

  const [owners, setOwners] = useState<Owner[]>([]);

  // Obtener la lista de dueños cuando el componente se monta
  useEffect(() => {
    async function fetchOwners() {
      try {
        const res = await getOwners();
        setOwners(res.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }

    fetchOwners();
  }, []);

  const onSubmit = async (data: MicroData) => {
    try {
      // Convertir 'dueño' a número antes de enviar la data
      const dataToSend = { ...data, dueño: parseInt(data.dueño) };
      await crearMicro(dataToSend);
      alert("Micro registrado con éxito.");
      reset();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2 mt-6 ml-0 md:mt-0 !ml-0">
      <h2 className="text-2xl font-bold mb-4">
        REGISTRAR MICRO - LÍNEA {linea}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 !ml-0">
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
        {errors.año && <p className="text-red-500">{errors.año.message}</p>}

        <input
          type="text"
          placeholder="Seguro"
          {...register("seguro", { required: "El seguro es obligatorio" })}
          className="p-2 border rounded-lg w-full"
        />
        {errors.seguro && (
          <p className="text-red-500">{errors.seguro.message}</p>
        )}

        <select
          {...register("dueño", { required: "El dueño es obligatorio" })}
          className="p-2 border rounded-lg w-full"
        >
          <option value="">Seleccionar dueño</option>
          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.nombre} {owner.apellido}
            </option>
          ))}
        </select>
        {errors.dueño && <p className="text-red-500">{errors.dueño.message}</p>}

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
