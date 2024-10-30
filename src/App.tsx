import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store/auth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PerfilPage from "./pages/PerfilPage.tsx";
import LineasPage from "./pages/LineasPage.tsx";
import LineaPage from "./pages/LineaPage.tsx";
import RutaPage from "./pages/RutaPage.tsx";
import MicrosPage from "./pages/MicrosPage.tsx";
import BitacoraPage from "./pages/BitacoraPage.tsx";
import EstadoMicroPage from "./pages/EstadoMicroPage.tsx";
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
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="perfil" element={<PerfilPage />} />
              <Route path="lineas" element={<LineasPage />} />
              <Route path="linea" element={<LineaPage />} />
              <Route path="ruta" element={<RutaPage />} />
              <Route path="micros" element={<MicrosPage />} />
              <Route path="bitacora" element={<BitacoraPage />} />
              <Route path="estado-micro" element={<EstadoMicroPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
