"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Settings,
  User,
  FileText,
  Truck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { userData } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src="/placeholder.svg?height=64&width=64"
            alt="User avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">{userData?.nombre}</h2>
      </div>
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          aria-label="View profile"
        >
          <User className="mr-2 h-4 w-4" />
          PERFIL
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          aria-label="View routes"
        >
          <FileText className="mr-2 h-4 w-4" />
          RUTAS
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          aria-label="View lines"
        >
          <Truck className="mr-2 h-4 w-4" />
          LINEAS
        </Button>
        <Button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </nav>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-[90%] flex flex-col md:flex-row">
        {/* Sidebar for larger screens */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 p-6 shadow-md">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
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
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6" aria-label="Notifications" />
              <Settings className="h-6 w-6" aria-label="Settings" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="surname"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Apellidos
                  </Label>
                  <Input
                    id="surname"
                    placeholder="Enter your surname"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="new-password"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Nueva Contraseña
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  Foto de perfil
                </p>
                <Avatar className="h-32 w-32 mb-2 mx-auto">
                  <AvatarImage
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile picture"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Editar <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full md:w-auto mt-6">Actualizar Datos</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
