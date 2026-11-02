import type { MatrizItem, MatrizItemInput } from "@core/iperc/MatrizItem";
import type { RiskLevel } from "@core/iperc/RiskLevel";

export interface RiesgoCalculado {
  resultado: number;
  nivelRiesgo: RiskLevel;
}

/**
 * Puerto de salida (out port) para la matriz IPERC. La fórmula R = P × S y
 * los umbrales de nivel de riesgo viven en el backend: este puerto solo
 * pide el cálculo, nunca lo reimplementa en el cliente.
 */
export interface IpercRepository {
  listItems(): Promise<MatrizItem[]>;
  calcularRiesgo(probabilidad: number, severidad: number): Promise<RiesgoCalculado>;
  createItem(input: MatrizItemInput): Promise<MatrizItem>;
  updateItem(id: string, input: MatrizItemInput): Promise<MatrizItem>;
}
