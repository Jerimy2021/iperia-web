import { useTranslation } from "@shared/i18n/useTranslation";
import { Spinner } from "@shared/ui/Spinner";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { EmptyState } from "@shared/ui/EmptyState";
import { MatrizForm } from "./MatrizForm";
import { RiskBadge } from "./RiskBadge";
import { useMatrizList } from "./useMatriz";

export function MatrizPage() {
  const t = useTranslation();
  const { data, isLoading, isError, refetch } = useMatrizList();

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-semibold text-neutral-900">{t.iperc.matriz.title}</h1>
        <p className="text-sm text-neutral-600">{t.iperc.matriz.subtitle}</p>
      </header>

      <MatrizForm />

      {isLoading && <Spinner label={t.common.loading} />}

      {isError && (
        <ErrorMessage
          message={t.iperc.matriz.loadError}
          retryLabel={t.common.retry}
          onRetry={() => void refetch()}
        />
      )}

      {!isLoading && !isError && data?.length === 0 && <EmptyState title={t.iperc.matriz.empty} />}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-0">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead>
              <tr className="text-left text-neutral-600">
                <th scope="col" className="px-4 py-2">
                  {t.iperc.matriz.fields.puesto}
                </th>
                <th scope="col" className="px-4 py-2">
                  {t.iperc.matriz.fields.tarea}
                </th>
                <th scope="col" className="px-4 py-2">
                  {t.iperc.matriz.fields.peligro}
                </th>
                <th scope="col" className="px-4 py-2">
                  {t.iperc.matriz.fields.riesgo}
                </th>
                <th scope="col" className="px-4 py-2">
                  {t.iperc.matriz.fields.nivelRiesgo}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.puesto}</td>
                  <td className="px-4 py-2">{item.tarea}</td>
                  <td className="px-4 py-2">{item.peligro}</td>
                  <td className="px-4 py-2">{item.riesgo}</td>
                  <td className="px-4 py-2">
                    <RiskBadge nivelRiesgo={item.nivelRiesgo} resultado={item.resultado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
