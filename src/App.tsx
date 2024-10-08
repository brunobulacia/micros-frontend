import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store/auth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PUBLICAS */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* COMPONENTE PADRE PARA PROTEGER LAS RUTAS PRIMO */}
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
