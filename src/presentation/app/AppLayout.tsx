import { useState } from "react";
import { Outlet } from "react-router";
import { useTranslation } from "@shared/i18n/useTranslation";
import { useAuth } from "@presentation/auth/useAuth";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppLayout() {
  const t = useTranslation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) {
    return null;
  }

  const roleLabel = t.nav.roles[user.role];

  return (
    <div className="flex min-h-screen bg-[color:var(--bg-app)]">
      {mobileOpen && (
        <button
          type="button"
          aria-label={t.nav.closeMenu}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <Sidebar
        role={user.role}
        userName={user.name}
        roleLabel={roleLabel}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        onNavigate={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          title={t.nav.appName}
          userName={user.name}
          roleLabel={roleLabel}
          onMenu={() => setMobileOpen(true)}
          onLogout={() => void logout()}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-gutter">
          <div className="mx-auto max-w-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
