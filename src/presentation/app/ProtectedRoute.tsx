import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { Role } from "@core/auth/Role";
import { useAuth } from "@presentation/auth/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allow?: (role: Role) => boolean;
}

export function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allow && !allow(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
