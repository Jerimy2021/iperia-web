import { useTranslation } from "@shared/i18n/useTranslation";
import { EmptyState } from "@shared/ui/EmptyState";

export function NoScreensPage() {
  const t = useTranslation();
  return <EmptyState title={t.nav.noScreensTitle} description={t.nav.noScreensDescription} />;
}
