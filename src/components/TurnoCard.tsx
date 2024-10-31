import { useAuthStore } from "@/store/auth";
import { CircleUserRound, OctagonMinus } from "lucide-react";
import { Turno } from "@/types";
import { handleAxiosError } from "@/utils/handleErrors";
import { finalizarTurno } from "@/api/turno";

const handleStopConfirmation = async (turno: Turno, token: string) => {
  const isConfirmed = window.confirm(
    "¿Estás seguro de que quieres terminar este turno?"
  );

  if (isConfirmed) {
    await StopTurno(turno, token);
  }
};

const StopTurno = async (turno: Turno, token: string) => {
  const id_horario = turno.id_horario;
  try {
    if (id_horario) {
        console.log(id_horario);
      await finalizarTurno(id_horario, token);
      alert("Turno terminado con exito");
      window.location.reload();
    } else {
      console.error("No se pudo obtener el id del turno");
    }
  } catch (error) {
    handleAxiosError(error);
  }
};

export const TurnoCard = ({ turno }: { turno: Turno }) => {
  const { token } = useAuthStore();
  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white">
      <CircleUserRound className="w-16 h-16 mr-4 hidden md:block" />
      <div className="flex">
        <div className="mr-4">
            <h3 className="font-bold">INTERNO {turno.interno}</h3>
            <p>
            <b>Chofer: </b>
            {turno.chofer}
            </p>
            <p>
            <b>Placa:</b> {turno.placa}
            </p>
        </div>
        <div>
            <p>
            <b>Hora de salida:</b> {turno.hora_salida}
            </p>
            <p>
            <b>Hora de llegada:</b> {turno.hora_llegada ?? "No hay hora de llegada"}
            </p>
            <p>
            <b>Fecha:</b> {turno.fecha_horario}
            </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row ml-auto h-full">
        <button
          className="h-10 w-10 rounded-md ml-auto bg-white items-center justify-items-center hover:bg-red-500"
          onClick={() => {
            handleStopConfirmation(turno, token);
          }}
        >
          <OctagonMinus className="h-10 w-10 rounded-md text-2xl bg-white hover:bg-red-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};
