"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  CircleArrowLeft,
  Bus,
  CalendarCheck2,
  CalendarCheck,
  CarFront,
  ChartNoAxesCombined,
  Route,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

//LIBRERIAS PARA VERIFICAR EL TOKEN DEL USUARIO Y OBTENER SUS DATOS
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";

export default function GestionDeLineas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { userData } = useAuthStore();

  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;
  const { role } = decoded;
  console.log(role);
  useEffect(() => {
    setMounted(true);
  }, []);

  const Sidebar = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-center mb-8">
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              <User className="h-10 w-10 text-gray-500" />{" "}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">{userData?.nombre}</h2>
        </div>
        <nav className="space-y-3">
          {role !== "Pasajero" && (
            <Button
              variant="ghost"
              className="w-full justify-start text-base py-3"
              aria-label="View profile"
              onClick={() => navigate("/lineas/horarios")}
            >
              <CalendarCheck className="mr-3 h-5 w-5" />
              HORARIOS
            </Button>
          )}

          {role === "Operador" ||
            (role === "Chofer" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-base py-3"
                aria-label="View lines"
                onClick={() => navigate("/lineas/turnos")}
              >
                <CarFront className="mr-3 h-5 w-5" />
                TURNOS
              </Button>
            ))}
          {role === "Operador" ||
            (role === "Chofer" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-base py-3"
                aria-label="View lines"
                onClick={() => navigate("/lineas/frecuencia-micros")}
              >
                <ChartNoAxesCombined className="mr-3 h-5 w-5" />
                FRECUENCIA DE MICROS
              </Button>
            ))}
          {role === "Operador" ||
            (role === "Chofer" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-base py-3"
                aria-label="View lines"
                onClick={() => navigate("/lineas/carga-horaria")}
              >
                <CalendarCheck2 className="mr-3 h-5 w-5" />
                CARGA HORARIA
              </Button>
            ))}
          {role !== "Pasajero" && (
            <Button
              variant="ghost"
              className="w-full justify-start text-base py-3"
              aria-label="View lines"
              onClick={() => navigate("/lineas/gmicros")}
            >
              <Bus className="mr-3 h-5 w-5" />
              {role !== "Operador" ? "VER MICROS" : "GESTIONAR MICROS"}
            </Button>
          )}

          <Button
            variant="ghost"
            className="w-full justify-start text-base py-3"
            aria-label="View lines"
            onClick={() => navigate("/lineas/grutas")}
          >
            <Route className="mr-3 h-5 w-5" />
            {role !== "Operador" ? "VER RUTAS" : "GESTIONAR RUTAS"}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base py-3"
            aria-label="View lines"
            onClick={() => navigate("/dashboard/")}
          >
            <CircleArrowLeft className="mr-3 h-5 w-5" />
            ATRAS
          </Button>
        </nav>
      </div>
      <div className="mt-auto">
        <Button
          onClick={() => {
            logout();
            navigate("/");
          }}
          variant="default"
          className="w-[90%] text-center ml-2 mt-4 text-lg py-3"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 bg-cover bg-center {{bg-[url('../../../public/santacruz_noche.jpg')]}}">
      <div className="w-full flex flex-col md:flex-row">
        <aside className="hidden h-screen md:flex md:flex-col w-80 bg-white dark:bg-gray-800 p-8 shadow-md">
          <Sidebar />
        </aside>

        <main className="flex-1 md:p-8 overflow-auto h-screen">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-2"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6 text-black" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
