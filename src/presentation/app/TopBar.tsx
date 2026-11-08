import { useTranslation } from "@shared/i18n/useTranslation";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icon";

interface TopBarProps {
  title: string;
  userName: string;
  roleLabel: string;
  onMenu: () => void;
  onLogout: () => void;
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

export function TopBar({ title, userName, roleLabel, onMenu, onLogout }: TopBarProps) {
  const t = useTranslation();
  return (
    <header className="flex h-topbar flex-none items-center gap-3 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-card)] px-4 md:px-gutter">
      <button
        type="button"
        onClick={onMenu}
        aria-label={t.nav.openMenu}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-md text-[color:var(--text-secondary)] hover:bg-surface-200 md:hidden"
      >
        <Icon name="menu" size={20} />
      </button>

      <h1 className="min-w-0 flex-1 truncate text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 sm:flex">
          <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white">
            {initials(userName)}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-[color:var(--text-primary)]">{userName}</span>
            <span className="text-2xs text-[color:var(--text-secondary)]">{roleLabel}</span>
          </span>
        </span>
        <Button variant="secondary" size="sm" icon="log-out" onClick={onLogout}>
          {t.auth.logout}
        </Button>
      </div>
    </header>
  );
}
