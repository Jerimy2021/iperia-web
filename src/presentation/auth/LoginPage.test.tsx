import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { LoginPage } from "./LoginPage";

function renderLoginPage() {
  return render(
    <MemoryRouter
      initialEntries={["/login"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  it("shows a validation error for an invalid email", async () => {
    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Correo electrónico"), "no-es-un-correo");
    await user.type(screen.getByLabelText("Contraseña"), "algo");
    await user.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(await screen.findByText("Ingresa un correo válido")).toBeInTheDocument();
  });

  it("shows an error message for wrong credentials", async () => {
    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Correo electrónico"), "supervisor@iperia.com");
    await user.type(screen.getByLabelText("Contraseña"), "contraseña-incorrecta");
    await user.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(await screen.findByText("Correo o contraseña incorrectos")).toBeInTheDocument();
  });

  it("does not show an error for correct credentials", async () => {
    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Correo electrónico"), "supervisor@iperia.com");
    await user.type(screen.getByLabelText("Contraseña"), "Supervisor123!");
    await user.click(screen.getByRole("button", { name: "Ingresar" }));

    await waitFor(() => {
      expect(screen.queryByText("Correo o contraseña incorrectos")).not.toBeInTheDocument();
    });
  });
});
