import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/GestionDeUsuarios/LoginPage.tsx";
import RegisterPage from "./pages/GestionDeUsuarios/RegisterPage.tsx";
import { useAuthStore } from "./store/auth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

// PAQUETES
import Usuarios from "@/pages/GestionDeUsuarios/Routes/RoutesGUsuarios.tsx";
import Lineas from "@/pages/GestionDeLineas/Routes/RoutesGLineas.tsx";
import Comunicacion from "@/pages/GestionDeComunicacion/Routes/RoutesGCom.tsx";
function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PUBLICAS */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* COMPONENTE PADRE PARA PROTEGER LAS RUTAS PRIVADAS */}
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* PAQUETE DE GESTION DE USUARIOS */}
            <Route path="/usuarios/*" element={<Usuarios />} />

            {/* PAQUETE DE GESTION DE LINEAS */}
            <Route path="/lineas/*" element={<Lineas />} />

            {/* PAQUETE DE GESTION DE RETROALIMENTACION */}
            <Route path="/feed/*" element={<Comunicacion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
