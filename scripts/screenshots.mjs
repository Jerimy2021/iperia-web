// Captures DS reskin screenshots at mobile (360) and desktop (1440) widths:
// login, matriz (supervisor) and the empty state (operario). Requires the dev
// server running on http://localhost:5173 with mocks enabled.
import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:5173";
const VIEWPORTS = [
  { w: 1440, h: 900, tag: "1440" },
  { w: 360, h: 780, tag: "360" },
];

async function login(page, email, password) {
  await page.goto(`${BASE}/login`);
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Ingresar" }).click();
}

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    // Login screen (unauthenticated)
    const loginCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const loginPage = await loginCtx.newPage();
    await loginPage.goto(`${BASE}/login`);
    await loginPage.getByRole("button", { name: "Ingresar" }).waitFor();
    await loginPage.screenshot({ path: `screenshots/login-${vp.tag}.png`, fullPage: true });
    await loginCtx.close();

    // Matriz IPERC (supervisor)
    const supCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const supPage = await supCtx.newPage();
    await login(supPage, "supervisor@iperia.com", "Supervisor123!");
    await supPage.waitForURL(/\/iperc$/);
    await supPage.getByRole("heading", { name: "Matriz IPERC" }).waitFor();
    await supPage.waitForTimeout(400);
    await supPage.screenshot({ path: `screenshots/matriz-${vp.tag}.png`, fullPage: true });
    await supCtx.close();

    // Empty state (operario has no screens in this panel)
    const opCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const opPage = await opCtx.newPage();
    await login(opPage, "operario@iperia.com", "Operario123!");
    await opPage.getByText("Todavía no hay pantallas").waitFor();
    await opPage.waitForTimeout(300);
    await opPage.screenshot({ path: `screenshots/empty-operario-${vp.tag}.png`, fullPage: true });
    await opCtx.close();

    console.log(`captured ${vp.tag}`);
  }
} finally {
  await browser.close();
}
