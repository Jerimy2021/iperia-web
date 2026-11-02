import { z } from "zod";
import { es } from "@shared/i18n/es";

const requiredText = z.string().min(1, es.common.requiredField);

/**
 * Rango 1-5 es una validación de entrada del formulario (escala típica de
 * probabilidad/severidad), no la fórmula de riesgo: R = P × S y sus
 * umbrales de clasificación los calcula y define el backend.
 */
const scaleNumber = z.coerce
  .number({ invalid_type_error: es.common.requiredField })
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

export type MatrizFormValues = z.infer<typeof matrizSchema>;
