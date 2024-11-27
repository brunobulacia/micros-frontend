import { Route, Routes } from "react-router-dom";
import GComunicacion from "@/pages/GestionDeComunicacion/GCom";
import NotificacionesPage from "../NotificacionesPage";
import RetroalimentacionPage from "../RetroalimentacionPage";
import ComunicacionPage from "../ComunicacionIntPage";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";
function RoutesGComunicacion() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;
  const { role } = decoded;
  console.log(role);
  return (
    <Routes>
      {/* PAQUETE DE GESTION DE USUARIOS */}
      <Route path="/" element={<GComunicacion />}>
        <Route path="notificaciones" element={<NotificacionesPage />} />
        <Route path="retroalimentacion" element={<RetroalimentacionPage />} />
        <Route path="comunicacion" element={<ComunicacionPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesGComunicacion;
