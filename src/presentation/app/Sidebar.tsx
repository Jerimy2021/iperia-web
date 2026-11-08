import { NavLink } from "react-router";
import { useTranslation } from "@shared/i18n/useTranslation";
import { Icon } from "@shared/ui/Icon";
import type { Role } from "@core/auth/Role";
import { canAccessMatrizIperc } from "@application/auth/permissions";

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  role: Role;
  userName: string;
  roleLabel: string;
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onNavigate: () => void;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * `collapsed` is a desktop-only state: it is applied through `md:` utilities
 * (icon-only rail) so the mobile drawer always shows full labels regardless.
 */
export function Sidebar({
  role,
  userName,
  roleLabel,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onNavigate,
}: SidebarProps) {
  const t = useTranslation();
  const hideOnCollapse = collapsed ? "md:hidden" : "";

  const items: NavItem[] = [];
  if (canAccessMatrizIperc(role)) {
    items.push({ to: "/iperc", label: t.nav.matriz, icon: "shield-alert" });
  }

  return (
    <nav
      aria-label={t.nav.appName}
      className={`fixed inset-y-0 left-0 z-50 flex w-sidebar flex-col border-r border-[color:var(--chrome-border)] bg-[color:var(--chrome-bg)] transition-[transform,width] duration-200 md:static md:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "md:w-sidebar-collapsed" : "md:w-sidebar"}`}
    >
      {/* Brand */}
      <div
        className={`flex h-topbar flex-none items-center gap-2.5 border-b border-[color:var(--chrome-border)] px-3.5 ${
          collapsed ? "md:justify-center md:px-3" : ""
        }`}
      >
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-blue-500 text-md font-bold text-white">
          i
        </span>
        <span className={`text-lg font-bold leading-tight tracking-tight text-white ${hideOnCollapse}`}>
          {t.nav.appName}
        </span>
      </div>

      {/* Nav items */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-2.5">
        {items.length > 0 && (
          <p
            className={`px-2.5 pb-1.5 text-2xs font-semibold uppercase tracking-[0.1em] text-[color:var(--chrome-text-muted)] ${hideOnCollapse}`}
          >
            {t.nav.section}
          </p>
        )}
        <div className="flex flex-col gap-0.5">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex h-9 items-center gap-2.5 rounded-md px-2.5 text-base font-medium transition-colors ${
                  collapsed ? "md:justify-center md:px-0" : ""
                } ${
                  isActive
                    ? "bg-blue-500 font-semibold text-white"
                    : "text-[color:var(--chrome-text)] hover:bg-[color:var(--chrome-hover)]"
                }`
              }
            >
              <Icon name={item.icon} size={17} />
              <span className={`truncate ${hideOnCollapse}`}>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* User + collapse toggle */}
      <div className="flex-none border-t border-[color:var(--chrome-border)] p-2.5">
        <div className={`flex items-center gap-2.5 px-1 py-1.5 ${hideOnCollapse}`}>
          <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-navy-500 text-sm font-semibold text-[color:var(--chrome-text)]">
            {initials(userName)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-base font-semibold text-[color:var(--chrome-text)]">
              {userName}
            </span>
            <span className="block text-2xs text-[color:var(--chrome-text-muted)]">{roleLabel}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? t.nav.expand : t.nav.collapse}
          className="mt-1 hidden h-[30px] w-full items-center justify-center gap-1.5 rounded-md text-sm text-[color:var(--chrome-text-muted)] hover:bg-[color:var(--chrome-hover)] md:flex"
        >
          <Icon name={collapsed ? "panel-left-open" : "panel-left-close"} size={15} />
          <span className={hideOnCollapse}>{t.nav.collapse}</span>
        </button>
      </div>
    </nav>
  );
}
