import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@shared/i18n/useTranslation";
import { TextField } from "@shared/ui/TextField";
import { Button } from "@shared/ui/Button";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-0 p-4"
    >
      <h2 className="text-lg font-medium text-neutral-900">{t.iperc.matriz.newItem}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        {calcular.data && (
          <RiskBadge nivelRiesgo={calcular.data.nivelRiesgo} resultado={calcular.data.resultado} />
        )}
        <Button type="submit" isLoading={isSubmitting || save.isPending} className="ml-auto">
          {isSubmitting || save.isPending ? t.iperc.matriz.submitting : t.iperc.matriz.submit}
        </Button>
      </div>

      {save.isError && <ErrorMessage message={t.iperc.matriz.saveError} />}
    </form>
  );
}
