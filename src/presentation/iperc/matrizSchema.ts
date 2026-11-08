import { z } from "zod";
import { es } from "@shared/i18n/es";

const requiredText = z.string().min(1, es.common.requiredField);

/**
 * Rango 1-5 es una validación de entrada del formulario (escala típica de
 * probabilidad/severidad), no la fórmula de riesgo: R = P × S y sus
 * umbrales de clasificación los calcula y define el backend.
 */
const scaleNumber = z.coerce
  .number({
    // zod v4 replaced `invalid_type_error` with a unified `error` map; keep the
    // custom message for the type/NaN case only and let min/max/int fall back
    // to zod's defaults, as before.
    error: (issue) => (issue.code === "invalid_type" ? es.common.requiredField : undefined),
  })
  .int()
  .min(1)
  .max(5);

export const matrizSchema = z.object({
  puesto: requiredText,
  tarea: requiredText,
  actividad: requiredText,
  peligro: requiredText,
  riesgo: requiredText,
  probabilidad: scaleNumber,
  severidad: scaleNumber,
});

/**
 * With zod v4, `z.coerce.number()` has a different input type (raw form value)
 * than its output (`number`), so the form is typed with both: `MatrizFormInput`
 * for `register`/`watch` and `MatrizFormValues` for the validated submit payload.
 */
export type MatrizFormInput = z.input<typeof matrizSchema>;
export type MatrizFormValues = z.output<typeof matrizSchema>;
