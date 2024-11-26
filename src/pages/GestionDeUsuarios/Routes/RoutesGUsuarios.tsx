import { Route, Routes } from "react-router-dom";
import GestionDeUsuarios from "../GestionDeUsuarios";
import PerfilPage from "../PerfilPage";
import SancionesPage from "../SancionesPage";
import HistorialSancPage from "../HistorialSancPage";
import BitacoraPage from "../BitacoraPage";
import RolesPage from "../RolesPage";
import { useAuthStore } from "@/store/auth";
import {
  ProtectedRouteOpChof,
  ProtectedRouteOperador,
} from "@/ProtectedRoutesRoles.tsx";

//LIBRERIAS PARA VERIFICAR EL TOKEN DEL USUARIO Y OBTENER SUS DATOS
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";

function RoutesGUsuarios() {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token) as DecodedToken;
  const { role } = decoded;
  console.log(role);

  return (
    <Routes>
      {/* PAQUETE DE GESTION DE USUARIOS */}
      <Route path="/" element={<GestionDeUsuarios />}>
        <Route path="perfil" element={<PerfilPage />} />
        <Route element={<ProtectedRouteOperador role={role} />}>
          <Route path="roles" element={<RolesPage />} />
        </Route>
        {role !== "Pasajero" && (
          <Route element={<ProtectedRouteOpChof role={role} />}>
            <Route path="sanciones" element={<SancionesPage />} />
            <Route path="historial-sanciones" element={<HistorialSancPage />} />
            <Route path="bitacora" element={<BitacoraPage />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default RoutesGUsuarios;
