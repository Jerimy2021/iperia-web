import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MatrizItemInput } from "@core/iperc/MatrizItem";
import {
  calcularRiesgoUseCase,
  listMatrizUseCase,
  saveMatrizItemUseCase,
} from "@application/iperc/useCases";
import { ipercRepository } from "./ipercRepository";

const MATRIZ_QUERY_KEY = ["iperc", "matriz"];

export function useMatrizList() {
  return useQuery({
    queryKey: MATRIZ_QUERY_KEY,
    queryFn: () => listMatrizUseCase(ipercRepository),
  });
}

export function useCalcularRiesgo() {
  return useMutation({
    mutationFn: ({ probabilidad, severidad }: { probabilidad: number; severidad: number }) =>
      calcularRiesgoUseCase(ipercRepository, probabilidad, severidad),
  });
}

export function useSaveMatrizItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: MatrizItemInput) => saveMatrizItemUseCase(ipercRepository, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MATRIZ_QUERY_KEY });
    },
  });
}
