"use client";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { updateUserRequest } from "@/api/auth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/types";
import { UpdatePassword } from "@/components/UpdatePassword";
import { DialogEliminarCuenta } from "@/components/EliminarCuenta";

export default function PerfilPage() {
  const { userData, token, setUserData } = useAuthStore();
  const { register, handleSubmit, setValue } = useForm<UserData>({
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md"
        >
          <h1 className="text-xl sm:text-2xl mb-6 font-semibold text-center text-zinc-700 sm:text-left">
            Actualizar Datos
          </h1>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="nombre"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  {...register("nombre")}
                  placeholder="Ingresa tu nombre"
                  className="text-sm sm:text-base dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="apellido"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  {...register("apellido")}
                  placeholder="Ingrese su apellido"
                  className="text-sm sm:text-base dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="correo"
                className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
              >
                Correo
              </Label>
              <p className="text-sm sm:text-base dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                {userData?.correo}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="fecha_de_nacimiento"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  Fecha de nacimiento
                </Label>
                <p className="text-sm sm:text-base dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.fecha_de_nacimiento}
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="carnet"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  Carnet
                </Label>
                <p className="text-sm sm:text-base dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.carnet}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="sexo"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  Sexo
                </Label>
                <p className="text-sm sm:text-base dark:bg-gray-700 bg-gray-100 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600">
                  {userData?.sexo === "M" ? "Masculino" : "Femenino"}
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="direccion"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  {...register("direccion")}
                  placeholder="Ingrese su dirección"
                  className="text-sm sm:text-base dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6 w-full text-base sm:text-lg text-zinc-100 dark:text-zinc-200"
          >
            Actualizar información
          </Button>
        </form>
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
          <UpdatePassword />
        </div>
      </div>
      <div className="mt-8">
        <DialogEliminarCuenta
          usuario={userData?.usuario}
          correo={userData?.correo}
        />
        {/* Pasa el nombre de usuario */}
      </div>
    </div>
  );
}
