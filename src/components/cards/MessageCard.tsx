import { CircleUserRound } from "lucide-react";
import { Mensaje } from "@/types";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken }from "@/types";

export const MessageCard = ({ mensaje }: { mensaje: Mensaje }) => {
  const { token } = useAuthStore();
  const decodedToken: DecodedToken = jwtDecode(token);
  const usuario = decodedToken.id;

  return (
    <div className="w-full">
      <div
        className={`border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center justify-between w-full md:w-1/2 lg:w-1/3 bg-slate-200 shadow-inner ${
          mensaje.emisor === usuario ? "float-right" : "float-left"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-4 sm:mb-0">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg">{mensaje.emisor}</h3>
            <p className="text-sm text-gray-500 mb-2">
              <b>{mensaje.rol}</b>
            </p>
            <p className="text-sm">{mensaje.contenido}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
