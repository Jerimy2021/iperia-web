import type { RiskLevel } from "./RiskLevel";

export interface MatrizItemInput {
  puesto: string;
  tarea: string;
  actividad: string;
  peligro: string;
  riesgo: string;
  probabilidad: number;
  severidad: number;
}

export interface MatrizItem extends MatrizItemInput {
  id: string;
  /** Resultado R = P × S calculado por el backend. */
  resultado: number;
  nivelRiesgo: RiskLevel;
}
