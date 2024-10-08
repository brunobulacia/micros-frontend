import { Navigate, Outlet } from "react-router-dom";

interface props {
  isAllowed: boolean;
  children?: React.ReactNode;
}

function ProtectedRoute({ isAllowed, children }: props) {
  if (!isAllowed) return <Navigate to="/" />;
  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
