import { Route, Routes } from "react-router-dom";
import GDeComunicacion from "../GDeComunicacion";
import NotificacionesPage from "../NotificacionesPage";
import RetroalimentacionPage from "../RetroalimentacionPage";
import ComunicacionIntPage from "../ComunicacionIntPage";

function RoutesGCom() {
  return (
    <Routes>
      {/* PAQUETE DE GESTION DE RETROALIMENTACION */}
      <Route path="/" element={<GDeComunicacion />} />
      <Route path="notificaciones" element={<NotificacionesPage />} />
      <Route path="feedback" element={<RetroalimentacionPage />} />
      <Route path="comunicacion" element={<ComunicacionIntPage />} />
    </Routes>
  );
}

export default RoutesGCom;
