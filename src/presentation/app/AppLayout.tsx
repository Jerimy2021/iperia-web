import { Outlet } from "react-router-dom";
import { useTranslation } from "@shared/i18n/useTranslation";
import { Button } from "@shared/ui/Button";
import { useAuth } from "@presentation/auth/useAuth";
import { NavByRole } from "./NavByRole";

export function AppLayout() {
  const t = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-col gap-3 border-b border-neutral-200 bg-neutral-0 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <span className="text-lg font-semibold text-brand-700">{t.appName}</span>
          <NavByRole />
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">
              {user.name} · {t.nav.roles[user.role]}
            </span>
            <Button variant="secondary" onClick={() => void logout()}>
              {t.auth.logout}
            </Button>
          </div>
        )}
      </header>
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
