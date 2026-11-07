import { describe, expect, it } from "vitest";
import { AuthHttpRepository } from "./AuthHttpRepository";
import { ApiError } from "@infrastructure/http/ApiError";

describe("AuthHttpRepository", () => {
  it("logs in a valid user and maps the response to a Session", async () => {
    const repository = new AuthHttpRepository();
    const session = await repository.login({
      email: "supervisor@iperia.com",
      password: "Supervisor123!",
    });

    expect(session.user.role).toBe("SUPERVISOR");
    expect(session.accessToken).toBeTruthy();
    expect(session.expiresAt).toBeGreaterThan(Date.now());
  });

  it("throws ApiError with INVALID_CREDENTIALS for wrong password", async () => {
    const repository = new AuthHttpRepository();

    await expect(
      repository.login({ email: "supervisor@iperia.com", password: "wrong" }),
    ).rejects.toSatisfy((error: unknown) => {
      return error instanceof ApiError && error.code === "INVALID_CREDENTIALS";
    });
  });
});
