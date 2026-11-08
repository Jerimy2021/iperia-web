import { useTranslation } from "@shared/i18n/useTranslation";
import { Spinner } from "@shared/ui/Spinner";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { EmptyState } from "@shared/ui/EmptyState";
import { Card } from "@shared/ui/Card";
import { MatrizForm } from "./MatrizForm";
import { RiskBadge } from "./RiskBadge";
import { useMatrizList } from "./useMatriz";

const headClass =
  "sticky top-0 bg-surface px-3 py-2 text-left text-2xs font-semibold uppercase tracking-[0.1em] text-[color:var(--text-secondary)]";
const cellClass = "px-3 py-2.5 align-middle text-[color:var(--text-body)]";

export function MatrizPage() {
  const t = useTranslation();
  const { data, isLoading, isError, refetch } = useMatrizList();

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">{t.iperc.matriz.title}</h1>
        <p className="mt-1 text-base text-[color:var(--text-secondary)]">{t.iperc.matriz.subtitle}</p>
      </header>

      <MatrizForm />

      {isLoading && <Spinner label={t.common.loading} center />}

      {isError && (
        <ErrorMessage
          message={t.iperc.matriz.loadError}
          retryLabel={t.common.retry}
          onRetry={() => void refetch()}
        />
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <Card padding="none">
          <EmptyState title={t.iperc.matriz.empty} icon="clipboard-list" />
        </Card>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-base">
              <thead>
                <tr className="border-b border-[color:var(--border-subtle)]">
                  <th scope="col" className={headClass}>
                    {t.iperc.matriz.fields.puesto}
                  </th>
                  <th scope="col" className={headClass}>
                    {t.iperc.matriz.fields.tarea}
                  </th>
                  <th scope="col" className={headClass}>
                    {t.iperc.matriz.fields.peligro}
                  </th>
                  <th scope="col" className={headClass}>
                    {t.iperc.matriz.fields.riesgo}
                  </th>
                  <th scope="col" className={headClass}>
                    {t.iperc.matriz.fields.nivelRiesgo}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[color:var(--border-subtle)] transition-colors hover:bg-surface"
                  >
                    <td className={`${cellClass} font-medium text-[color:var(--text-primary)]`}>
                      {item.puesto}
                    </td>
                    <td className={cellClass}>{item.tarea}</td>
                    <td className={cellClass}>{item.peligro}</td>
                    <td className={cellClass}>{item.riesgo}</td>
                    <td className={cellClass}>
                      <RiskBadge nivelRiesgo={item.nivelRiesgo} resultado={item.resultado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </section>
  );
}
