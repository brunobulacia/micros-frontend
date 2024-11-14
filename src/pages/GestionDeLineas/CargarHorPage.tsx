"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { handleAxiosError } from "@/utils/handleErrors";
import { cargaHoraria } from "@/api/turno";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CargaHorCard } from "@/components/cards/CargaHor";

type FormData = {
  token: string;
  chofer: string;
  fecha: string;
};

interface Linea {
  id_linea: string;
  nombre_linea: string;
  id_sindicato: string;
}

interface Operador {
  usuario_operador: string;
  id_linea: string;
  linea: Linea;
}

interface Horario {
  hora_llegada_aproximada: string;
  hora_salida: string;
  horas_turno: string;
  operadore: Operador;
}

interface Chofere {
  usuario_chofer: string;
  licencia_categoria: string;
  estado: string;
}

interface micro {
  interno: string;
  placa: string;
}

interface Turno {
  id_turno: string;
  usuario_chofer: string;
  punto_de_salida: string;
  fecha: string;
  id_horario: string;
  id_micro: string;
  horario: Horario;
  chofere: Chofere;
  hora_llegada?: string;
  micro: micro;
}

export default function CargarHorPage() {
  const { token } = useAuthStore();

  const [turnosList, setTurnosList] = useState<Turno[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCargaHorariaOpen, setIsCargaHorariaOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalHoras, setTotalHoras] = useState("");
  const [fechaTurno, setFechaTurno] = useState("");
  const [chofer, setChofer] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const formatTotalHoras = (time: string) => {
    if (!time) {
      return "";
    }
    const [hours, minutes] = time.split(":").map(Number);

    if (hours === 0) {
      return `${minutes} minutos`;
    } else if (minutes === 0) {
      return `${hours} horas`;
    } else {
      return `${hours} horas y ${minutes} minutos`;
    }
  };

  const onSubmit = async (data: FormData) => {
    data.token = token;
    setIsSubmitting(true);
    try {
      const res = await cargaHoraria(data);
      console.log(res);
      setTurnosList(res.data.turnos);
      setTotalHoras(res.data.totalHoras);
      setFechaTurno(res.data.turnos[0].fecha);
      setChofer(res.data.turnos[0].chofere.usuario_chofer);
      alert("Datos recibidos correctamente");
      setIsCargaHorariaOpen(false);
      reset();
    } catch (error) {
      handleAxiosError(error);
      alert("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-full flex flex-col">
      <div className="flex mb-8 flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center w-full">
          <div className="relative w-full bg-white">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="w-full md:w-auto bg-blue-800"
          onClick={() => setIsCargaHorariaOpen(true)}
        >
          Ver Chofer CH
        </Button>
      </div>
      <div>
        {chofer && <h1 className="text-xl font-bold mb-4">Chofer: {chofer}</h1>}
      </div>
      <div>
        {totalHoras && (
          <h1 className="text-xl font-bold mb-4">
            Tiempo Trabajado: {formatTotalHoras(totalHoras)}
          </h1>
        )}
        {fechaTurno && (
          <h1 className="text-xl font-bold mb-4">
            Fecha del turno: {fechaTurno}
          </h1>
        )}
      </div>
      <div className="flex-grow overflow-hidden">
        {turnosList.length === 0 ? (
          <p>El chofer no tiene turnos</p>
        ) : (
          <div className="h-full overflow-y-auto pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {turnosList.map((turno) => (
                <CargaHorCard key={turno.id_turno} turno={turno} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Dialog open={isCargaHorariaOpen} onOpenChange={setIsCargaHorariaOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Carga Horario del Chofer</DialogTitle>
            <DialogDescription>
              Ingrese los datos del chofer y la fecha para cargar el horario.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreChofer">Nombre del chofer</Label>
                  <Input
                    id="nombreChofer"
                    {...register("chofer", {
                      required: "Este campo es requerido",
                    })}
                  />
                  {errors.chofer && (
                    <p className="text-sm text-red-500">
                      {errors.chofer.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    {...register("fecha", {
                      required: "Este campo es requerido",
                    })}
                  />
                  {errors.fecha && (
                    <p className="text-sm text-red-500">
                      {errors.fecha.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
