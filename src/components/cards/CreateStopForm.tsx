import { useAuthStore } from "@/store/auth";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Stop } from "@/types";
import { crearParada } from "@/api/rutas";
import { handleAxiosError } from "@/utils/handleErrors";

export const CreateStopForm = () => {
  const { token } = useAuthStore();
  const location = useLocation();
  const { id_ruta } = location.state;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre_parada: "",
      ruta: "",
      orden_parada: 0,
      coordenadas: {
        lon: 0,
        lat: 0,
      },
      token,
      id_parada: null,
    },
  });

  const onSubmit = async (data: Stop) => {
    try {
      data.token = token;

      const stop: Stop = {
        id_parada: null,
        nombre_parada: data.nombre_parada,
        orden_parada: Number(data.orden_parada),
        coordenadas: {
          lon: Number(data.coordenadas.lon),
          lat: Number(data.coordenadas.lat),
        },
        token: token,
      };

      await crearParada(stop, id_ruta);

      alert("Parada creada con exito");
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    }
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-10">CREAR PARADA</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md w-[100%] border-2 border-gray-950 mt-5"
      >
        <div className="w-full md:w-full px-2 mb-4 bg">
          <label
            htmlFor="nombre"
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            Nombre
          </label>
          <input
            id="nombre_parada"
            {...register("nombre_parada")}
            placeholder="Ingresa el nombre de la parada"
            className="dark:bg-gray-700 dark:text-white text-base w-full md:w-full mt-2 p-2"
          />
        </div>
        <div className="w-full md:w-full px-2 mb-4">
          <label
            htmlFor="orden"
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            Orden
          </label>
          <input
            id="orden_parada"
            {...register("orden_parada")}
            placeholder="Ingresa el orden de la parada"
            className="dark:bg-gray-700 dark:text-white text-base w-full md:w-full mt-2 p-2"
          />
        </div>
        <div className="w-full md:w-full px-2 mb-4">
          <label
            htmlFor="longitud"
            className="text-gray-700 dark:text-gray-300 text-lg"
          >
            Coordenadas
          </label>
          <div>
            <input
              id="lat"
              {...register("coordenadas.lat")}
              placeholder="Latitud"
              className="dark:bg-gray-700 dark:text-white text-base w-full md:w-1/3 mt-2 mr-8 p-2"
            />
            <input
              id="lon"
              {...register("coordenadas.lon")}
              placeholder="Longitud"
              className="dark:bg-gray-700 dark:text-white text-base w-full md:w-1/3 mt-2 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 text-center "
          >
            Crear Parada
          </button>
        </div>
      </form>
    </>
  );
};