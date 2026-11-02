/** Forma de error que devuelve el backend: { "error": { "code", "message" } }. */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }

  static fromResponseBody(status: number, body: unknown): ApiError {
    if (isApiErrorBody(body)) {
      return new ApiError(status, body.error.code, body.error.message);
    }
    return new ApiError(status, "UNKNOWN", "Ocurrió un error inesperado.");
  }
}

function isApiErrorBody(body: unknown): body is ApiErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof (body as ApiErrorBody).error?.code === "string" &&
    typeof (body as ApiErrorBody).error?.message === "string"
  );
}
