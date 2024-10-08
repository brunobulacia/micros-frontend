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
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginRequest } from "@/api/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

interface FormData {
  usuario: string;
  contraseña: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
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
      const res = await loginRequest(data);
      console.log(res);
      setToken(res.data.token);
      navigate("/dashboard");
      setUserData({
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className="text-4xl font-bold mb-10 text-center">
        TRANSPORTE PUBLICO
      </h1>
      <Card className="w-full max-w-sm bg-white">
        <CardHeader>
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
                className="h-10 text-base"
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
              <Input
                id="contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
                className="h-10 text-base"
                {...register("contraseña", {
                  required: "Contraseña es requerida",
                })}
              />
            </div>
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
