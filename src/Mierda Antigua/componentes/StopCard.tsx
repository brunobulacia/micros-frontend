import { useAuthStore } from "@/store/auth";
import { OctagonMinus, Trash2 } from "lucide-react";
import { eliminarParada } from "@/api/rutas";
import { Stop } from "@/types";

const handleDeleteConfirmation = async (stop: Stop, token: string) => {
  const isConfirmed = window.confirm(
    "¿Estás seguro de que quieres eliminar este chofer?"
  );

  if (isConfirmed) {
    await DeleteStop(stop, token);
  }
};

const DeleteStop = async (stop: Stop, token: string) => {
  const id_parada = stop.id_parada;
  try {
    if (id_parada) {
      await eliminarParada(id_parada, token);
      alert("Parada eliminada con exito");
      window.location.reload();
    } else {
      console.error("No se pudo obtener el uuid de la parada");
    }
  } catch (error) {
    console.error(error);
  }
};

export const StopCard = ({ stop, role }: { stop: Stop; role: string }) => {
  const { token } = useAuthStore();
  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center w-full lg:w-5/6 bg-white">
      <div className="flex items-center">
        <OctagonMinus className="w-17px h-17px mr-10" />
        <p className="font-bold text-xl">{stop.nombre_parada}</p>
      </div>
      {role === "Operador" ? (
        <button
          className="flex h-10 w-10 rounded-md ml-auto bg-white items-center justify-items-center hover:bg-red-500"
          onClick={() => {
            handleDeleteConfirmation(stop, token);
          }}
        >
          <Trash2 className="h-10 w-10 rounded-md text-2xl bg-white hover:bg-red-500 hover:text-white" />
        </button>
      ) : null}
    </div>
  );
};
