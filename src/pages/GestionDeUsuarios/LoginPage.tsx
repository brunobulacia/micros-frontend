"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginRequest } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { LoginData } from "@/types";
import { AxiosError } from "axios"; // Si usas Axios, por ejemplo

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const { userData, setUserData } = useAuthStore();

  useEffect(() => {
    if (userData) {
      console.log("Datos del usuario:", userData);
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setLoading(true);
    try {
      const res = await loginRequest(data);
      console.log(res);
      setToken(res.data.token);
      navigate("/usuarios/perfil");
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || "Error al iniciar sesión");
      } else {
        setError("Ha ocurrido un error desconocido");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('../../../public/santacruz_noche.jpg')]}}">
      <Card className="w-full max-w-sm bg-zinc-300">
        <CardHeader>
          <h1 className="md:text-4xl font-bold mb-10 text-center bg-zinc-300 p-1 rounded-lg opacity-90 text-3xl">
            TRANSPORTE PUBLICO
          </h1>
          <CardTitle className="text-2xl font-semibold text-center">
            Inicio de sesion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="usuario" className="text-base font-medium">
                Usuario
              </Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Ingresa tu usuario"
                required
                className="h-10 text-base bg-white"
                {...register("usuario", { required: "Usuario es requerido" })}
              />
              {errors.usuario && (
                <p style={{ color: "red" }}>{errors.usuario.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="contraseña" className="text-base font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="h-10 text-base bg-white pr-10"
                  {...register("contraseña", {
                    required: "Contraseña es requerida",
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            {error && (
              <p className="bg-red-500 text-center text-white p-2 font-medium">
                {error}
              </p>
            )}
            <Button
              className="w-full h-10 text-base"
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Iniciar sesion"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-base text-gray-600">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
