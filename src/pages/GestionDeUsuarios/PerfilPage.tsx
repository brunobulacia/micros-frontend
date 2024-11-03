"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { updateUserRequest } from "@/api/auth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/types";
import { UpdatePassword } from "@/components/UpdatePassword";

function PerfilPage() {
  const { userData, token, setUserData } = useAuthStore();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      usuario: "",
      contraseña: "",
      confirmar_contraseña: "",
      nombre: "",
      apellido: "",
      correo: "",
      sexo: "",
      fecha_de_nacimiento: "",
      direccion: "",
      telefonos: null,
      carnet: "",
      token: "",
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

  const onSubmit = async (data: UserData) => {
    if (window.confirm("¿Estás seguro de que quieres actualizar los datos?")) {
      data.token = token;
      if (userData) data.usuario = userData.usuario;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-6 font-semibold text-center sm:text-left">
        ACTUALIZAR DATOS
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="nombre"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  {...register("nombre")}
                  placeholder="Ingresa tu nombre"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="apellido"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  {...register("apellido")}
                  placeholder="Ingrese su apellido"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="correo"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Correo
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.correo}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="fecha_de_nacimiento"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Fecha de nacimiento
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.fecha_de_nacimiento}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="carnet"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Carnet
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.carnet}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sexo"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Sexo
                </Label>
                <p className="dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.sexo === "M" ? "Masculino" : "Femenino"}
                </p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="direccion"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  {...register("direccion")}
                  placeholder="Ingrese su dirección"
                  className="dark:bg-gray-700 dark:text-white w-full sm:w-3/4 md:w-1/2"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-start">
            <p className="mb-2 text-gray-700 dark:text-gray-300 text-lg font-semibold">
              Foto de perfil
            </p>
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="Profile picture"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Editar
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full sm:w-auto mt-6">
          Actualizar información
        </Button>
      </form>
      <div className="mt-8">
        <UpdatePassword />
      </div>
    </div>
  );
}

export default PerfilPage;
