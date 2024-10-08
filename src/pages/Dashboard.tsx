import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  return (
    <div>
      <Button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
