import type { RiskLevel } from "@core/iperc/RiskLevel";
import type { MatrizItem } from "@core/iperc/MatrizItem";

/** Simula la tabla de usuarios del backend. Solo para VITE_USE_MOCKS=true. */
export const mockUsers = [
  {
    id: "u-1",
    name: "Lucía Supervisor",
    email: "supervisor@iperia.com",
    password: "Supervisor123!",
    role: "SUPERVISOR",
  },
  {
    id: "u-2",
    name: "Jorge Gerencia",
    email: "gerencia@iperia.com",
    password: "Gerencia123!",
    role: "GERENCIA_EHS",
  },
  {
    id: "u-3",
    name: "Ana Operaria",
    email: "operario@iperia.com",
    password: "Operario123!",
    role: "OPERARIO",
  },
  {
    id: "u-4",
    name: "Pedro Brigadista",
    email: "brigadista@iperia.com",
    password: "Brigadista123!",
    role: "BRIGADISTA",
  },
];

/**
 * Banda de clasificación 5x5 típica de IPERC, usada SOLO para que el mock
 * se comporte de forma realista. La regla real vive en el backend; este
 * archivo deja de usarse en cuanto VITE_USE_MOCKS=false.
 */
export function clasificarRiesgoMock(resultado: number): RiskLevel {
  if (resultado <= 4) return "aceptable";
  if (resultado <= 9) return "moderado";
  if (resultado <= 16) return "importante";
  return "intolerable";
}

export const mockMatrizItems: MatrizItem[] = [
  {
    id: "m-1",
    puesto: "Operador de planta",
    tarea: "Carga de material",
    actividad: "Uso de montacargas",
    peligro: "Colisión con peatones",
    riesgo: "Atropello",
    probabilidad: 3,
    severidad: 4,
    resultado: 12,
    nivelRiesgo: "importante",
  },
];
