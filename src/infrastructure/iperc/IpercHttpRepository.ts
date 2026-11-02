import type { IpercRepository, RiesgoCalculado } from "@application/iperc/ports";
import type { MatrizItem, MatrizItemInput } from "@core/iperc/MatrizItem";
import { apiRequest } from "@infrastructure/http/apiClient";

/**
 * Rutas asumidas para este sprint (crear/editar/calcular matriz IPERC).
 * Ajustar una vez que `npm run api:gen` genere los tipos/rutas reales
 * desde el swagger del backend.
 */
export class IpercHttpRepository implements IpercRepository {
  async listItems(): Promise<MatrizItem[]> {
    return apiRequest<MatrizItem[]>("/iperc/matriz");
  }

  async calcularRiesgo(probabilidad: number, severidad: number): Promise<RiesgoCalculado> {
    return apiRequest<RiesgoCalculado>("/iperc/matriz/calcular", {
      method: "POST",
      body: { probabilidad, severidad },
    });
  }

  async createItem(input: MatrizItemInput): Promise<MatrizItem> {
    return apiRequest<MatrizItem>("/iperc/matriz", {
      method: "POST",
      body: input,
    });
  }

  async updateItem(id: string, input: MatrizItemInput): Promise<MatrizItem> {
    return apiRequest<MatrizItem>(`/iperc/matriz/${id}`, {
      method: "PUT",
      body: input,
    });
  }
}
