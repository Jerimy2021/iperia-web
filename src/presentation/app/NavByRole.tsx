import { NavLink } from "react-router-dom";
import { useTranslation } from "@shared/i18n/useTranslation";
import { useAuth } from "@presentation/auth/useAuth";
import { canAccessMatrizIperc } from "@application/auth/permissions";

export function NavByRole() {
  const t = useTranslation();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <nav aria-label={t.appName} className="flex gap-4">
      {canAccessMatrizIperc(user.role) && (
        <NavLink
          to="/iperc"
          className={({ isActive }) =>
            `text-sm font-medium ${isActive ? "text-brand-700" : "text-neutral-600 hover:text-brand-600"}`
          }
        >
          {t.nav.matriz}
        </NavLink>
      )}
    </nav>
  );
}
