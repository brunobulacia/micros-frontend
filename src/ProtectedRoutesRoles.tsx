import { Navigate, Outlet } from "react-router-dom";

interface props {
  role: string;
  children?: React.ReactNode;
}

export function ProtectedRouteOpChof({ role, children }: props) {
  console.log(role);
  if (role === "Operador" || role === "Chofer") return <Navigate to="" />;
  return children ? <>{children}</> : <Outlet />;
}

export function ProtectedRouteOperador({ role, children }: props) {
  if (role !== "Operador") return <Navigate to="" />;
  return children ? <>{children}</> : <Outlet />;
}
