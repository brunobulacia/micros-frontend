"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Menu,
  User,
  BellRing,
  CircleArrowLeft,
  MessageCircleQuestion,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

//LIBRERIAS PARA VERIFICAR EL TOKEN DEL USUARIO Y OBTENER SUS DATOS
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";
//LIBRERIAS PARA VERIFICAR EL TKEN DEL USUARIO Y OBTENER SUS DATOS
export default function Dashboard() {
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
          <Button
            variant="ghost"
            className="w-full justify-start text-base py-3 hover:bg-gray-300"
          >
            <BellRing className="mr-3 h-5 w-5" />
            <Link to="/feed/notificaciones" className="w-full text-start">
              NOTIFICACIONES
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base py-3 hover:bg-gray-300"
          >
            <MessageCircleQuestion className="mr-3 h-5 w-5" />
            <Link to="/feed/retroalimentacion" className="w-full text-start">
              RETROALIMENTACION
            </Link>
          </Button>
          {role !== "Pasajero" && (
            <Button
              variant="ghost"
              className="w-full justify-start text-base py-3 hover:bg-gray-300"
            >
              <Send className="mr-3 h-5 w-5" />
              <Link to="/feed/comunicacion" className="w-full text-start">
                COMUNICACION INT.
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-base py-3"
          >
            <CircleArrowLeft className="mr-3 h-5 w-5" />
            <Link to="/dashboard/" className="w-full text-start">
              ATRAS
            </Link>
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
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 bg-cover bg-center {{bg-[url('../../../public/santacruz_noche.jpg')]}}">
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