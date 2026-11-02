import type { MatrizItem, MatrizItemInput } from "@core/iperc/MatrizItem";
import type { IpercRepository, RiesgoCalculado } from "./ports";

export async function listMatrizUseCase(repository: IpercRepository): Promise<MatrizItem[]> {
  return repository.listItems();
}

export async function calcularRiesgoUseCase(
  repository: IpercRepository,
  probabilidad: number,
  severidad: number,
): Promise<RiesgoCalculado> {
  return repository.calcularRiesgo(probabilidad, severidad);
}

export async function saveMatrizItemUseCase(
  repository: IpercRepository,
  input: MatrizItemInput,
  existingId?: string,
): Promise<MatrizItem> {
  if (existingId) {
    return repository.updateItem(existingId, input);
  }
  return repository.createItem(input);
}
