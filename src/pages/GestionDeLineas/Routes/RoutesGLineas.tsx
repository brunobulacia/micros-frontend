import { Route, Routes } from "react-router-dom";
import GestionDeLineas from "../GestionDeLineas";
import HorariosPage from "../HorariosPage";
import TurnosPage from "../TurnosPage";
import FrecMicrosPage from "../FrecMicrosPage";
import CargarHorPage from "../CargarHorPage";
import GDeMicros from "../GestionDeMicros/GDeMicros";
import TempMicros from "../GestionDeMicros/MicrosPage";
import TempMant from "../GestionDeMicros/MantenimientoPage";
import TempEstado from "../GestionDeMicros/EstadoMicrosPage";
import TempRevision from "../GestionDeMicros/RevisionTecn";
import GDeRutas from "../GestionDeRutas/GDeRutas";
import TempRutas from "../GestionDeRutas/TempRutas";
import TempParadas from "../GestionDeRutas/TempParadas";
import TempMapas from "../GestionDeRutas/TempMapas";
import IncidentesPage from "../GestionDeMicros/IncidentesPage";
import { useAuthStore } from "@/store/auth";
import LineasPage from "../GestionDeRutas/LineasPage";
//LIBRERIAS PARA VERIFICAR EL TOKEN DEL USUARIO Y OBTENER SUS DATOS
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";
function RoutesGLineas() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;
  const { role } = decoded;
  console.log(role);
  return (
    <Routes>
      {/* PAQUETE DE GESTION DE LINEAS */}
      <Route path="/" element={<GestionDeLineas />}>
        <Route path="horarios" element={<HorariosPage />} />
        <Route path="turnos" element={<TurnosPage />} />
        <Route path="frecuencia-micros" element={<FrecMicrosPage />} />
        <Route path="carga-horaria" element={<CargarHorPage />} />
      </Route>

      <Route path="gmicros" element={<GDeMicros />}>
        <Route path="micros" element={<TempMicros />} />
        <Route path="mantenimiento" element={<TempMant />} />
        <Route path="estado" element={<TempEstado />} />
        <Route path="revision-tecnica" element={<TempRevision />} />
        <Route path="incidentes" element={<IncidentesPage />} />
      </Route>
      <Route path="grutas" element={<GDeRutas />}>
        <Route path="rutas" element={<TempRutas />} />
        <Route path="paradas" element={<TempParadas />} />
        <Route path="mapas" element={<TempMapas />} />
        <Route path="lineasP" element={<LineasPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesGLineas;
