/**
 * El backend es la única fuente de verdad sobre niveles y umbrales de riesgo
 * (fórmula R = P × S y sus rangos). El cliente solo renderiza lo que recibe,
 * nunca recalcula ni clasifica por su cuenta.
 */
export type RiskLevel = "aceptable" | "moderado" | "importante" | "intolerable";
