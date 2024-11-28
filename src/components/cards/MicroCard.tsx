import { useState } from "react";
import { Micro } from "@/types";
import { programarMantenimiento } from "@/api/mantenimiento";
import { handleAxiosError } from "@/utils/handleErrors";
import { Bus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MicroCardProps {
  micro: Micro;
  token: string;
}

export const MicroCard = ({ micro, token }: MicroCardProps) => {
  const [mantenimientoModal, setMantenimientoModal] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  const handleMantenimientoSubmit = async () => {
    try {
      await programarMantenimiento({
        descripcion,
        interno: micro.interno,
        token,
        fecha,
      });
      alert("Mantenimiento programado con éxito.");
      setMantenimientoModal(false);
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
            <Dialog
              open={mantenimientoModal}
              onOpenChange={setMantenimientoModal}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> Mantenimiento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Programar Mantenimiento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descripcion" className="text-right">
                      Descripción
                    </Label>
                    <Input
                      id="descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fecha" className="text-right">
                      Fecha
                    </Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setMantenimientoModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleMantenimientoSubmit}>Programar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
