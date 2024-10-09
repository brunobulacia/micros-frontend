import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store/auth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PerfilPage from "./pages/PerfilPage.tsx";
import LineasPage from "./pages/LineasPage.tsx";
import RutasPage from "./pages/RutasPage.tsx";
import LineaPage from "./pages/LineaPage.tsx";
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
              <Route path="lineas" element={<RutasPage />} />
              <Route path="lineas" element={<LineaPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
