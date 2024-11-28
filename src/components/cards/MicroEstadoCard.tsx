import { useState } from "react";
import { Micro } from "@/types";
import { setEstado } from "@/api/estado";
import { handleAxiosError } from "@/utils/handleErrors";
import { Check, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface MicroCardProps {
  micro: Micro;
  token: string;
}

export const MicroCard = ({ micro }: MicroCardProps) => {
  const [estado, setEstadoLocal] = useState(
    micro.estados[0]?.estado || "NO DISPONIBLE"
  );
  const [nuevoEstado, setNuevoEstado] = useState(estado);

  const estadoColor = {
    DISPONIBLE: "bg-green-500",
    TRABAJANDO: "bg-yellow-500",
    INCIDENTE: "bg-red-500",
    "NO DISPONIBLE": "bg-gray-500",
  };

  const handleEstadoChange = (value: string) => {
    setNuevoEstado(
      value as "DISPONIBLE" | "TRABAJANDO" | "INCIDENTE" | "NO DISPONIBLE"
    );
  };

  const handleConfirmEstado = async () => {
    try {
      await setEstado({ estado: nuevoEstado, id_micro: micro.id_micro });
      setEstadoLocal(nuevoEstado);
      alert("Estado actualizado con éxito.");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Bus className="h-6 w-6" />
          <span>{micro.modelo}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className={`h-16 w-2 rounded-full ${estadoColor[estado]}`} />
          <div className="flex-grow grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Placa: {micro.placa}</p>
              <p className="text-sm font-medium">Interno: {micro.interno}</p>
              <p className="text-sm font-medium">Año: {micro.año}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Modelo: {micro.modelo}</p>
              <p className="text-sm font-medium">Seguro: {micro.seguro}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Select value={nuevoEstado} onValueChange={handleEstadoChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DISPONIBLE">DISPONIBLE</SelectItem>
                <SelectItem value="TRABAJANDO">TRABAJANDO</SelectItem>
                <SelectItem value="INCIDENTE">INCIDENTE</SelectItem>
                <SelectItem value="NO DISPONIBLE">NO DISPONIBLE</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleConfirmEstado} className="w-full">
              <Check className="mr-2 h-4 w-4" /> Confirmar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
