import { Route, Routes } from "react-router-dom";
import GestionDeLineas from "../GestionDeLineas";
import HorariosPage from "../HorariosPage";
import TurnosPage from "../TurnosPage";
import FrecMicrosPage from "../FrecMicrosPage";
import CargarHorPage from "../CargarHorPage";
import GDeMicros from "../GestionDeMicros/GDeMicros";
import TempMicros from "../GestionDeMicros/MicrosPage";
import TempMant from "../GestionDeMicros/MantenimientoPage";
import TempEstado from "../GestionDeMicros/TempEstado";
import TempRevision from "../GestionDeMicros/RevisionTecn";
import GDeRutas from "../GestionDeRutas/GDeRutas";
import TempRutas from "../GestionDeRutas/TempRutas";
import TempParadas from "../GestionDeRutas/TempParadas";
import TempMapas from "../GestionDeRutas/TempMapas";

function RoutesGLineas() {
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
      </Route>
      <Route path="grutas" element={<GDeRutas />}>
        <Route path="rutas" element={<TempRutas />} />
        <Route path="paradas" element={<TempParadas />} />
        <Route path="mapas" element={<TempMapas />} />
      </Route>
    </Routes>
  );
}

export default RoutesGLineas;
