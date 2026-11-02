import { Navigate } from "react-router-dom";
import { useAuth } from "@presentation/auth/useAuth";
import { canAccessMatrizIperc } from "@application/auth/permissions";
import { NoScreensPage } from "./NoScreensPage";

export function RoleHome() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (canAccessMatrizIperc(user.role)) {
    return <Navigate to="/iperc" replace />;
  }

  return <NoScreensPage />;
}
