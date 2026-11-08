import { expect, test } from "@playwright/test";

test("un supervisor inicia sesión y llega a la matriz IPERC", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel("Correo electrónico").fill("supervisor@iperia.com");
  await page.getByLabel("Contraseña").fill("Supervisor123!");
  await page.getByRole("button", { name: "Ingresar" }).click();

  await expect(page).toHaveURL(/\/iperc$/);
  await expect(page.getByRole("heading", { name: "Matriz IPERC" })).toBeVisible();
  // The authenticated shell (sidebar + topbar) is rendered: the user's name and
  // the logout action are visible.
  await expect(page.getByText("Lucía Supervisor").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Cerrar sesión" })).toBeVisible();
});
