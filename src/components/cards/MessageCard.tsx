import { Mensaje } from "@/types";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";

export const MessageCard = ({ mensaje }: { mensaje: Mensaje }) => {
  const { token } = useAuthStore();
  const decodedToken: DecodedToken = jwtDecode(token);
  const usuario = decodedToken.id;

  return (
    <div className="w-full h-auto">
      <div
        className={`border rounded-lg p-4 mb-4 flex flex-col items-start w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-slate-200 shadow-inner ${
          mensaje.emisor === usuario ? "float-right" : "float-left"
        }`}
        style={{ wordBreak: "break-word" }} // Forzar el salto de línea en palabras largas
      >
        <div className="w-full">
          <h3 className="font-bold text-lg mb-2">{mensaje.emisor}</h3>
          <p className="text-sm text-gray-500 mb-2">
            <b>{mensaje.rol}</b>
          </p>
          <p className="text-sm break-words">{mensaje.contenido}</p>
        </div>
      </div>
    </div>
  );
  
};
