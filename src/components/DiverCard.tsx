import { useAuthStore } from "@/store/auth";
import {  CircleUserRound , Trash2 } from "lucide-react";
import { Driver } from "@/types";
import { eliminarChofer } from "@/api/chofer";
import { handleAxiosError } from "@/utils/handleErrors";

export const DriverCard = ({ driver }: { driver: Driver }) => {
    const { token } = useAuthStore();
    return (
      <div className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white">
        <CircleUserRound className="w-16 h-16 mr-4" />
        <div>
          <h3 className="font-bold">{driver.usuario}</h3>
          <p>
            <b>Nombre: </b>
            {driver.nombre} {driver.apellido}
          </p>
          <p>
            <b>CI:</b> {driver.carnet}
          </p>
          <p>
            <b>Licencia:</b> {driver.licencia_categoria}
          </p>
          <p>
            <b>Sexo:</b> {driver.sexo}
          </p>
          <p>
            <b>Correo:</b> {driver.correo}
          </p>
        </div>
        <div className="flex flex-col md:flex-row ml-auto h-full">
          <span className="ml-auto md:mr-10">🟡 TRABAJANDO</span>
          <button
            className="h-10 w-10 rounded-md ml-auto bg-white items-center justify-items-center hover:bg-red-500"
            onClick={() => {
              handleDeleteConfirmation(driver, token);
            }}
          >
            <Trash2 className="h-10 w-10 rounded-md text-2xl bg-white hover:bg-red-500 hover:text-white" />
          </button>
        </div>
      </div>
    );
  };
  
  const handleDeleteConfirmation = async (driver: Driver, token: string) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar este chofer?"
    );
  
    if (isConfirmed) {
      await DeleteDriver(driver, token);
    }
  };
  
  const DeleteDriver = async (driver: Driver, token: string) => {
    const usuario_chofer = driver.usuario;
    try {
      if (usuario_chofer) {
        await eliminarChofer(usuario_chofer, token);
        alert("Chofer eliminado con exito");
        window.location.reload();
      } else {
        console.error("No se pudo obtener el usuario del chofer");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };