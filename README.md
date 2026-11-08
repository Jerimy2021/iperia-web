# iperia-web

Panel web de IperIA para supervisores y gerencia: matriz IPERC, OT y dashboard.

> **Alcance de este Sprint 1:** login + rutas protegidas por rol, cerrar sesión / expiración de sesión, y la pantalla de matriz IPERC. OT, dashboard, hash, sensores y predicción quedan fuera de alcance y no están implementados.

## Stack

React 18 + TypeScript + Vite · React Router 7 · TanStack Query · React Hook Form + Zod 4 · Tailwind CSS · Vitest + Testing Library · Playwright · ESLint + Prettier · MSW (mocks).

## Arquitectura

El código sigue el mismo principio de arquitectura hexagonal que `iperia-backend` (Domain → Application → Infrastructure, nunca al revés), adaptado a un frontend:

```
src/
  core/            Entidades de dominio puras (User, Role, Session, MatrizItem...).
                   No depende de nada.
  application/     Puertos (interfaces que implementa infrastructure) y
                   casos de uso (login, logout, calcular/guardar matriz).
                   Depende solo de core.
  infrastructure/  Adaptadores: cliente HTTP, repositorios HTTP concretos,
                   TokenStorage y los handlers de MSW (mocks). Implementa
                   los puertos de application.
  presentation/    Componentes React, páginas, routing y los hooks que
                   conectan la UI con los casos de uso (composition root).
  shared/          Design tokens, i18n y componentes de UI reutilizables
                   (sin lógica de negocio).
```

Regla de dependencia: `core` no importa nada del proyecto; `application` solo importa de `core`; `infrastructure` y `presentation` importan de `application`/`core`, nunca al revés. Esto permite cambiar la implementación HTTP real por MSW (o por otra) sin tocar casos de uso ni componentes.

## Entorno de desarrollo

Este repo trae `flake.nix` + `.envrc` (Nix + direnv), igual que `iperia-backend`:

```
direnv allow   # o: nix develop
npm install
npm run dev
```

Si no usas Nix, basta con Node.js ≥ 20 y `npm install`.

### Playwright en NixOS

`npx playwright install` descarga binarios genéricos de Linux que **no corren en NixOS** (falta `libglib-2.0.so.0` y otras libs FHS). El `flake.nix` ya resuelve esto: dentro de `nix develop`/`direnv` se exporta `PLAYWRIGHT_BROWSERS_PATH` apuntando al Chromium que empaqueta `nixpkgs`, así que `npm run e2e` funciona sin instalar nada aparte. Si corres fuera de Nix, usa el flujo estándar: `npx playwright install chromium`.

## Variables de entorno

Copia `.env.example` a `.env` y ajusta:

| Variable         | Descripción                                          |
| ---------------- | ---------------------------------------------------- |
| `VITE_API_URL`   | URL base del backend ASP.NET Core (sin slash final). |
| `VITE_USE_MOCKS` | `true` usa MSW en vez del backend real.              |

## Scripts

| Script                            | Qué hace                                                                                                                                                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                     | Servidor de desarrollo.                                                                                                                                                     |
| `npm run build`                   | Typecheck + build de producción.                                                                                                                                            |
| `npm run typecheck`               | Solo typecheck (`tsc -b --noEmit`).                                                                                                                                         |
| `npm run lint` / `lint:fix`       | ESLint.                                                                                                                                                                     |
| `npm run format` / `format:check` | Prettier.                                                                                                                                                                   |
| `npm run test`                    | Vitest (unit + componentes, con MSW).                                                                                                                                       |
| `npm run e2e`                     | Playwright (requiere navegador, ver arriba).                                                                                                                                |
| `npm run api:gen`                 | Genera `src/infrastructure/http/generated/api-types.ts` desde `$VITE_API_URL/swagger/v1/swagger.json` con `openapi-typescript`. Pendiente de correr contra el backend real. |

## Mocks (MSW)

Con `VITE_USE_MOCKS=true`, `src/infrastructure/mocks` simula `/auth/login`, `/auth/logout` y los endpoints de IPERC (`GET/POST /iperc/matriz`, `POST /iperc/matriz/calcular`, `PUT /iperc/matriz/:id`). Usuarios de prueba (`src/infrastructure/mocks/data.ts`):

| Email                 | Password       | Rol          |
| --------------------- | -------------- | ------------ |
| supervisor@iperia.com | Supervisor123! | SUPERVISOR   |
| gerencia@iperia.com   | Gerencia123!   | GERENCIA_EHS |
| operario@iperia.com   | Operario123!   | OPERARIO     |
| brigadista@iperia.com | Brigadista123! | BRIGADISTA   |

**Importante:** la clasificación de riesgo (`clasificarRiesgoMock`) que usa el mock es solo para que la simulación se comporte de forma realista. La fórmula `R = P × S` y sus umbrales reales los define el backend (`POST /iperc/matriz/calcular`); el cliente nunca la reimplementa fuera de `mocks/`.

## Rutas de IPERC asumidas

El sprint pide "crear/editar/calcular matriz" pero el swagger del backend aún no está disponible. Mientras tanto, `IpercHttpRepository` asume:

- `GET /iperc/matriz`
- `POST /iperc/matriz/calcular` `{ probabilidad, severidad } → { resultado, nivelRiesgo }`
- `POST /iperc/matriz` (crear)
- `PUT /iperc/matriz/:id` (editar)

Ajustar estas rutas (y reemplazar los DTOs manuales en `AuthHttpRepository`/`IpercHttpRepository` por los tipos de `npm run api:gen`) en cuanto el swagger real esté disponible.

## Sesión y token

- El JWT vive **solo en memoria** (`src/infrastructure/auth/TokenStorage.ts`, variable de módulo), nunca en `localStorage`/`sessionStorage`. Se pierde al refrescar la página — es una decisión consciente para este sprint: evita exponer el token a un XSS vía storage. Si el backend requiere persistir sesión entre refrescos, la alternativa es una cookie `httpOnly` gestionada por el propio backend, no `localStorage` en el cliente.
- El contrato de este sprint no incluye un endpoint de refresh. "Refresco simple" se implementó como: al hacer login se guarda `expiresAt`, se agenda un `setTimeout` para esa fecha y, al cumplirse (o ante un 401 del backend), se cierra la sesión localmente y se redirige a `/login` (HU 1.2). Si el backend agrega `/auth/refresh`, reemplazar ese timer por una llamada real antes de que expire.

## Permisos por pantalla

Este sprint solo tiene una pantalla protegida (matriz IPERC) y es de supervisión/gerencia (`src/application/auth/permissions.ts`): `SUPERVISOR` y `GERENCIA_EHS` la ven; `OPERARIO` y `BRIGADISTA` inician sesión pero ven un estado vacío indicando que sus pantallas (captura de evidencia, etc.) están en `iperia-mobile`, no en este panel.

## Diseño

Mientras no se reciban los mockups/export de Claude Design, los valores viven centralizados en `src/shared/design-tokens.json` (consumido tanto por `tailwind.config.cjs` como por `src/shared/design-tokens.ts`), para poder ajustarlos sin refactor. Incluye el semáforo de nivel de riesgo (Aceptable=verde, Moderado=amarillo, Importante=naranja, Intolerable=rojo). La tipografía está configurada como "Inter" con fallback a `system-ui`; falta auto-hospedar la fuente cuando lleguen los mockups.

## Testing

- **Unit/componentes:** `npm run test` (Vitest + Testing Library + jsdom). Los tests de red usan `msw/node` (`src/test/setup.ts`) contra los mismos handlers que corren en el navegador.
- **E2E:** `npm run e2e` corre el único test pedido para este sprint (`e2e/login.spec.ts`): un supervisor inicia sesión y llega a la matriz IPERC.

## Pendientes / deuda técnica conocida

- **Resuelto en Sprint 2 (higiene):** se subió `zod` a v4 (cierra GHSA-mrhx-c7xc-m3w5, la alta de prod) y se migró `react-router-dom` v6 → `react-router` v7 (cierra GHSA-wrjc-x8rr-h8h6 / GHSA-337j-9hxr-rhxg). El `npm audit` ya no reporta nada en dependencias de producción.
- **Deuda restante — solo toolchain de desarrollo:** `npm audit` aún reporta 13 hallazgos (2 críticos, 1 alto, 10 moderados), **todos en devDependencies** (no entran al bundle de producción): `vite`/`esbuild` (dev server), `vitest`/`tinypool`/`@vitest/mocker`/`vite-node` (test runner) y `@typescript-eslint/*` → `minimatch` (linter). Los fixes requieren upgrades de versión mayor del toolchain (`vite@8`, `vitest@5`) o un `overrides` forzando `minimatch@11` (que typescript-eslint aún no soporta: su `typescript-estree` fija `minimatch ^10`). No se aplicaron aquí porque exceden el alcance de estos tres tickets y cambiarían la base de build/test; recomendado como ticket propio "subir toolchain (Vite 8 + Vitest 5)".
- `npm run api:gen` no se ha corrido todavía: el backend aún no publica swagger. Las rutas/DTOs de IPERC y auth son un contrato asumido (ver secciones arriba) que hay que validar apenas el backend esté disponible. Las rutas ya están centralizadas en `src/infrastructure/http/routes.ts` (un solo lugar donde ajustarlas cuando llegue el OpenAPI); los DTOs manuales siguen en los repositorios a la espera de `api:gen`.
- Design tokens son un placeholder razonable, pendientes de reemplazo por los mockups reales de Claude Design.
