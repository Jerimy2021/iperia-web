import { describe, expect, it } from "vitest";
import { matrizSchema } from "./matrizSchema";

const validInput = {
  puesto: "Operador de planta",
  tarea: "Carga de material",
  actividad: "Uso de montacargas",
  peligro: "Colisión con peatones",
  riesgo: "Atropello",
  probabilidad: 3,
  severidad: 4,
};

describe("matrizSchema", () => {
  it("accepts a fully filled item with probabilidad/severidad in range", () => {
    const result = matrizSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects an empty required field", () => {
    const result = matrizSchema.safeParse({ ...validInput, puesto: "" });
    expect(result.success).toBe(false);
  });

  it("rejects probabilidad/severidad outside the 1-5 scale", () => {
    const result = matrizSchema.safeParse({ ...validInput, severidad: 9 });
    expect(result.success).toBe(false);
  });
});
