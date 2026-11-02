import { http, HttpResponse } from "msw";
import type { MatrizItemInput } from "@core/iperc/MatrizItem";
import { clasificarRiesgoMock, mockMatrizItems } from "../data";

const apiUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

function calcular(probabilidad: number, severidad: number) {
  const resultado = probabilidad * severidad;
  return { resultado, nivelRiesgo: clasificarRiesgoMock(resultado) };
}

export const ipercHandlers = [
  http.get(`${apiUrl}/iperc/matriz`, () => {
    return HttpResponse.json(mockMatrizItems);
  }),

  http.post(`${apiUrl}/iperc/matriz/calcular`, async ({ request }) => {
    const body = (await request.json()) as { probabilidad: number; severidad: number };
    return HttpResponse.json(calcular(body.probabilidad, body.severidad));
  }),

  http.post(`${apiUrl}/iperc/matriz`, async ({ request }) => {
    const input = (await request.json()) as MatrizItemInput;
    const { resultado, nivelRiesgo } = calcular(input.probabilidad, input.severidad);
    const created = { id: `m-${mockMatrizItems.length + 1}`, ...input, resultado, nivelRiesgo };
    mockMatrizItems.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put(`${apiUrl}/iperc/matriz/:id`, async ({ request, params }) => {
    const input = (await request.json()) as MatrizItemInput;
    const { resultado, nivelRiesgo } = calcular(input.probabilidad, input.severidad);
    const index = mockMatrizItems.findIndex((item) => item.id === params.id);

    if (index === -1) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Registro no encontrado" } },
        { status: 404 },
      );
    }

    const updated = { id: params.id as string, ...input, resultado, nivelRiesgo };
    mockMatrizItems[index] = updated;
    return HttpResponse.json(updated);
  }),
];
