"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, Link } from "react-router-dom";
import { signupRequest } from "@/api/auth";
import { useAuthStore } from "@/store/auth";

type FormData = {
  usuario: string;
  contraseña: string;
  confirmar_contraseña: string;
  nombre: string;
  apellido: string;
  correo: string;
  sexo: string;
  fecha_de_nacimiento: string;
  direccion: string;
  telefonos: string;
  carnet: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const { userData } = useAuthStore();
  const { setUserData } = useAuthStore();

  useEffect(() => {
    if (userData) {
      console.log("Datos del usuario:", userData); // Mostrar datos por consola
    }
  }, [userData]); // Se ejecuta cada vez que `userData` cambia

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true); // Habilita el loading
    try {
      //PARA CONVERTIR LOS TELEFONOS A UN ARRAY
      if (!Array.isArray(data.telefonos)) {
        data.telefonos = [data.telefonos];
      }
      const res = await signupRequest(data);
      console.log(res);
      setToken(res.data.token);
      navigate("/dashboard");
      setUserData({
        usuario: res.data.datos.usuario,
        nombre: res.data.datos.nombre,
        apellido: res.data.datos.apellido,
        correo: res.data.datos.correo,
        sexo: res.data.datos.sexo,
        fecha_de_nacimiento: res.data.datos.fecha_de_nacimiento,
        direccion: res.data.datos.direccion,
        carnet: res.data.datos.carnet,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Deshabilita el loading cuando la petición termina
    }
  };

  const password = watch("contraseña"); //comprueba si las contras son iguales

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl mt-6 px-4 ">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            Registro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="nombre" className="text-base sm:text-base">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  {...register("nombre", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.nombre && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.nombre.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="apellido" className="text-base sm:text-base">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  {...register("apellido", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.apellido && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.apellido.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="usuario" className="text-base sm:text-base">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  {...register("usuario", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.usuario && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.usuario.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="correo" className="text-base sm:text-base">
                  Correo electrónico
                </Label>
                <Input
                  id="correo"
                  type="email"
                  {...register("correo", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.correo && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.correo.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="contraseña" className="text-base sm:text-base">
                  Contraseña
                </Label>
                <Input
                  id="contraseña"
                  type="password"
                  {...register("contraseña", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.contraseña && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.contraseña.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="confirmar-contraseña"
                  className="text-base sm:text-base"
                >
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmar_contraseña"
                  type="password"
                  {...register("confirmar_contraseña", {
                    required: "Este campo es requerido",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.confirmar_contraseña && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.confirmar_contraseña.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor="fecha_de_nacimiento"
                  className="text-base sm:text-base"
                >
                  Fecha de Nacimiento
                </Label>
                <Input
                  id="fecha_de_nacimiento"
                  type="date"
                  {...register("fecha_de_nacimiento", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base w-full"
                />
                {errors.fecha_de_nacimiento && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.fecha_de_nacimiento.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="sexo" className="text-base sm:text-base">
                  Sexo
                </Label>
                <Select onValueChange={(value) => setValue("sexo", value)}>
                  <SelectTrigger className="h-8 text-base sm:text-base">
                    <SelectValue placeholder="Selecciona  " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sexo && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.sexo.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="telefonos" className="text-base sm:text-base">
                  Teléfono
                </Label>
                <Input
                  id="telefonos"
                  type="tel"
                  {...register("telefonos", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.telefonos && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.telefonos.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="direccion" className="text-base sm:text-base">
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  {...register("direccion", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.direccion && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.direccion.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="carnet" className="text-base sm:text-base">
                  Carnet
                </Label>
                <Input
                  id="carnet"
                  {...register("carnet", {
                    required: "Este campo es requerido",
                  })}
                  className="h-8 text-base sm:text-base"
                />
                {errors.carnet && (
                  <p className="text-xs sm:text-base text-red-500">
                    {errors.carnet.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="w-full sm:w-auto px-8 py-2 text-base sm:text-base"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </div>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-base text-gray-600">
            ¿Ya tenés cuenta?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Inicia sesion
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
