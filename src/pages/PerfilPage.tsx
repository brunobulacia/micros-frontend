"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { updatePassword, updateUserRequest } from "@/api/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = {
  contraseña: string;
  confirmar_contraseña: string;
  nueva_contraseña: string;
};


const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true); // Habilita el loading
    console.log(data)
    try {
      const res = await updatePassword(data.contraseña, data.nueva_contraseña, token);
      console.log(res.data);
      alert(res.data.message)
      window.location.reload()
    } catch (error) {
      alert(error.response.data.message)
      console.error(error.response.data);
    } finally {
      setLoading(false); // Deshabilita el loading cuando la petición termina
    }
  };
  const password = watch("nueva_contraseña");

  return(
    <div>
      <h1 className="mt-2 mb-1 text-3xl font-semibold"> ACTUALIZAR CONTRASEÑA </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md w-[90%]">
              <div className="space-y-1 m-2 mr-10">
                <div className="w-full md:w-1/3 flex flex-col">
                  <label htmlFor="contraseña" className="text-base font-medium mr-5">
                    Contraseña
                  </label>
                  <Input
                    id="contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña actual"
                    required
                    className="h-10 text-base p-2"
                    {...register("contraseña", {
                      required: "Contraseña es requerida",
                    })}
                  />
                </div>
                <div className="space-y-1 flex flex-col md:flex-row mt-16">
                  <div className="mr-10 w-full md:w-1/3 flex flex-col">
                    <label htmlFor="contraseña" className="text-base font-medium">
                      Nueva contraseña
                    </label>
                    <Input
                      id="nueva_contraseña"
                      type="password"
                      placeholder="Ingresa tu contraseña nueva"
                      required
                      className="h-10 text-base p-2"
                      {...register("nueva_contraseña", {
                        required: "Contraseña es requerida",
                      })}
                    />
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col m-0">
                    <label
                      htmlFor="confirmar_contraseña"
                      className="text-base sm:text-base font-semibold"
                    >
                      Confirmar Contraseña
                    </label>
                    <Input
                      id="confirmar_contraseña"
                      type="password"
                      placeholder="Ingresa tu contraseña de nuevo"
                      {...register("confirmar_contraseña", {
                        required: "Este campo es requerido",
                        validate: (value) =>
                          value === password || "Las contraseñas no coinciden",
                      })}
                      className="h-10 text-base p-2"
                    />
                    {errors.confirmar_contraseña && (
                      <p className="text-xs sm:text-base text-red-500">
                        {errors.confirmar_contraseña.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                    className="w-full md:w-1/3 h-10"
                    type="submit"
                    disabled={loading}
                    >
                    {loading ? "Enviando..." : "Actualizar"}
                  </Button>
              </div>
            </form>
      </div>
  )
}


function PerfilPage() {
  const { userData, token, setUserData } = useAuthStore();
  const { register, handleSubmit, setValue } = useForm({
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

  return (
    <div>
      <h1 className="text-3xl mb-1 font-semibold">ACTUALIZAR DATOS</h1>
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
                <Input
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
                <Input
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
                <Input
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
      <UpdatePassword />
    </div>
  );
}
export default PerfilPage;
