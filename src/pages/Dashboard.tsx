"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, Settings, User, MapPin, Bus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, Outlet } from "react-router-dom";
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
    <div className="flex flex-col h-full justify-between">
      <div>
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
            onClick={() => navigate("/dashboard/perfil")}
          >
            <User className="mr-2 h-4 w-4" />
            PERFIL
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            aria-label="View lines"
            onClick={() => navigate("/dashboard/lineas")}
          >
            <Bus className="mr-2 h-4 w-4" />
            LINEAS
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
          className="w-[90%] text-center m-2 mb-4"
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
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full flex flex-col md:flex-row">
        <aside className="hidden h-screen md:flex md:flex-col w-64 bg-white dark:bg-gray-800 p-6 shadow-md">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 md:p-8 overflow-auto h-screen">
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
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6" aria-label="Notifications" />
              <Settings className="h-6 w-6" aria-label="Settings" />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
