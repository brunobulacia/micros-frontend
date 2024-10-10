"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/auth";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { updateUserRequest } from "@/api/auth";

function PerfilPage() {
  const { userData, token, setUserData } = useAuthStore();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      correo: "",
      sexo: "",
      fecha_de_nacimiento: "",
      direccion: "",
      carnet: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("nombre", userData.nombre);
      setValue("apellido", userData.apellido);
      setValue("correo", userData.correo);
      setValue("sexo", userData.sexo);
      setValue("fecha_de_nacimiento", userData.fecha_de_nacimiento);
      setValue("direccion", userData.direccion);
      setValue("carnet", userData.carnet);
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    
    if (window.confirm("¿Estás seguro de que quieres actualizar los datos?")){
    data.token = token;
    data.usuario = userData?.usuario;
    console.log(data);
    const res = await updateUserRequest(data);
    console.log(res);
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
    alert("Los datos se han actualizado correctamente.");
    console.log("Datos actualizados:", data);
  }
  };

  // Obteniendo el valor actual del sexo
  const selectedSexo = watch("sexo");

  return (
    <div>
      <h1 className="text-3xl mb-6 font-semibold">ACTUALIZAR DATOS</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md w-[90%]"
      >
        <div className="flex flex-wrap -mx-2 w-full">
          <div className="w-full md:w-2/3 px-2">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="nombre"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Nombre
                </Label>
                <input
                  id="nombre"
                  {...register("nombre")}
                  placeholder="Ingresa tu nombre"
                  className="dark:bg-gray-700 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="apellido"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Apellido
                </Label>
                <input
                  id="apellido"
                  {...register("apellido")}
                  placeholder="Ingrese su apellido"
                  className="dark:bg-gray-700 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Correo no editable */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="correo"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Correo
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.correo}
                </p>
              </div>

              {/* Cumpleaños no editable */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="fecha_de_nacimiento"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Fecha de nacimiento
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.fecha_de_nacimiento}
                </p>
              </div>

              {/* Carnet no editable */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="carnet"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Carnet
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.carnet}
                </p>
              </div>

              {/* Sexo no editable */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="sexo"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Sexo
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.sexo === "M" ? "Masculino" : "Femenino"}
                </p>
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <Label
                  htmlFor="direccion"
                  className="text-gray-700 dark:text-gray-300 text-lg"
                >
                  Dirección
                </Label>
                <input
                  id="direccion"
                  {...register("direccion")}
                  placeholder="Ingrese su dirección"
                  className="dark:bg-gray-700 dark:text-white text-base w-full p-2 rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="text-center">
              <p className="mb-2 text-gray-700 dark:text-gray-300 text-lg font-semibold">
                Foto de perfil
              </p>
              <Avatar className="h-32 w-32 mb-2 mx-auto">
                <AvatarImage
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile picture"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="lg">
                Editar
              </Button>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full md:w-auto mt-6">
          Actualizar información
        </Button>
      </form>
    </div>
  );
}
export default PerfilPage;
