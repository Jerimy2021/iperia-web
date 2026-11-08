import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@shared/i18n/useTranslation";
import { TextField } from "@shared/ui/TextField";
import { Button } from "@shared/ui/Button";
import { Card } from "@shared/ui/Card";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { matrizSchema, type MatrizFormInput, type MatrizFormValues } from "./matrizSchema";
import { useCalcularRiesgo, useSaveMatrizItem } from "./useMatriz";
import { RiskBadge } from "./RiskBadge";

function parseScale(value: unknown): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

export function MatrizForm() {
  const t = useTranslation();
  const calcular = useCalcularRiesgo();
  const { mutate: calcularRiesgo } = calcular;
  const save = useSaveMatrizItem();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MatrizFormInput, unknown, MatrizFormValues>({
    resolver: zodResolver(matrizSchema),
  });

  const probabilidad = watch("probabilidad");
  const severidad = watch("severidad");

  useEffect(() => {
    const p = parseScale(probabilidad);
    const s = parseScale(severidad);
    if (p !== null && s !== null) {
      calcularRiesgo({ probabilidad: p, severidad: s });
    }
  }, [probabilidad, severidad, calcularRiesgo]);

  const onSubmit = async (values: MatrizFormValues) => {
    await save.mutateAsync(values);
    reset();
  };

  const fields: Array<{ name: keyof MatrizFormValues; type?: string }> = [
    { name: "puesto" },
    { name: "tarea" },
    { name: "actividad" },
    { name: "peligro" },
    { name: "riesgo" },
    { name: "probabilidad", type: "number" },
    { name: "severidad", type: "number" },
  ];

  return (
    <Card title={t.iperc.matriz.newItem} icon="square-pen">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(({ name, type }) => (
            <TextField
              key={name}
              label={t.iperc.matriz.fields[name]}
              type={type}
              min={type === "number" ? 1 : undefined}
              max={type === "number" ? 5 : undefined}
              error={errors[name]?.message}
              {...register(name)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-subtle)] pt-4">
          {calcular.data ? (
            <RiskBadge nivelRiesgo={calcular.data.nivelRiesgo} resultado={calcular.data.resultado} />
          ) : (
            <span className="text-base text-[color:var(--text-secondary)]">
              {t.iperc.matriz.fields.nivelRiesgo}
            </span>
          )}
          <Button
            type="submit"
            icon="calculator"
            isLoading={isSubmitting || save.isPending}
            className="ml-auto"
          >
            {isSubmitting || save.isPending ? t.iperc.matriz.submitting : t.iperc.matriz.submit}
          </Button>
        </div>

        {save.isError && <ErrorMessage message={t.iperc.matriz.saveError} />}
      </form>
    </Card>
  );
}
