import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "@presentation/auth/LoginPage";
import { MatrizPage } from "@presentation/iperc/MatrizPage";
import { useAuth } from "@presentation/auth/useAuth";
import { canAccessMatrizIperc } from "@application/auth/permissions";
import { AppLayout } from "./AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleHome } from "./RoleHome";

function LoginRoute() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <LoginPage />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RoleHome />} />
        <Route
          path="iperc"
          element={
            <ProtectedRoute allow={canAccessMatrizIperc}>
              <MatrizPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
