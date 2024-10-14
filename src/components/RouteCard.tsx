import { Route } from "lucide-react";
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
