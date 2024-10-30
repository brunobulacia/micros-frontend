/*   import { Route } from "lucide-react";
  import { RouteType } from "@/types";
  import { useNavigate } from "react-router-dom";

  export const RouteCard = ({
    route,
    id_linea,
  }: {
    route: RouteType;
    id_linea: string;
  }) => {
    const navigate = useNavigate();
    return (
      <button
        className="border rounded-lg p-4 mb-4 flex items-center w-full bg-white hover:bg-zinc-200 m-4"
        onClick={() =>
          navigate("/dashboard/ruta", {
            state: { id_ruta: route.id_ruta, id_linea },
          })
        }
      >
        <div className="flex items-center">
          <Route className="w-20 h-20 mr-10" />
          <h3 className="font-bold text-5xl">{route.id_ruta}</h3>
        </div>
      </button>
    );
  };
 */
import React from "react";
import { Route, ChevronRight } from "lucide-react";
import { RouteType } from "@/types";
import { useNavigate } from "react-router-dom";

interface RouteCardProps {
  route: RouteType;
  id_linea: string;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, id_linea }) => {
  const navigate = useNavigate();

  return (
    <button
      className="w-full bg-white hover:bg-zinc-100 border rounded-lg p-3 mb-2 flex items-center justify-between transition-colors duration-200"
      onClick={() =>
        navigate("/dashboard/ruta", {
          state: { id_ruta: route.id_ruta, id_linea },
        })
      }
    >
      <div className="flex items-center space-x-3">
        <Route className="w-8 h-8 text-gray-600" />
        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-lg">{route.id_ruta}</h3>
          <p className="text-sm text-gray-600">{route.nombre_ruta}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
};
