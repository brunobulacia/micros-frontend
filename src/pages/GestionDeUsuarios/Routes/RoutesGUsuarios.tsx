import { Route, Routes } from "react-router-dom";
import GestionDeUsuarios from "../GestionDeUsuarios";
import PerfilPage from "../PerfilPage";
import SancionesPage from "../SancionesPage";
import HistorialSancPage from "../HistorialSancPage";
import BitacoraPage from "../BitacoraPage";

function RoutesGUsuarios() {
  return (
    <Routes>
      {/* PAQUETE DE GESTION DE USUARIOS */}
      <Route path="/" element={<GestionDeUsuarios />}>
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="sanciones" element={<SancionesPage />} />
        <Route path="historial-sanciones" element={<HistorialSancPage />} />
        <Route path="bitacora" element={<BitacoraPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesGUsuarios;
