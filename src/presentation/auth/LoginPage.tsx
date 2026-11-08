import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, type Location } from "react-router";
import { useTranslation } from "@shared/i18n/useTranslation";
import { TextField } from "@shared/ui/TextField";
import { Button } from "@shared/ui/Button";
import { Icon } from "@shared/ui/Icon";
import { ApiError } from "@infrastructure/http/ApiError";
import { useAuth } from "./useAuth";
import { loginSchema, type LoginFormValues } from "./loginSchema";

interface LocationState {
  from?: Location;
}

export function LoginPage() {
  const t = useTranslation();
  const { login, sessionEndReason } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      const state = location.state as LocationState | null;
      navigate(state?.from?.pathname ?? "/", { replace: true });
    } catch (error) {
      if (error instanceof ApiError && error.code === "INVALID_CREDENTIALS") {
        setError("root", { message: t.auth.login.invalidCredentials });
      } else {
        setError("root", { message: t.auth.login.genericError });
      }
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-auto bg-[color:var(--navy-700)] px-4 py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 18%, rgba(46,134,222,.16), transparent 55%)",
        }}
      />
      <div className="relative flex w-full max-w-[420px] flex-col items-center gap-5">
        <img
          src="/logo-iperia-lockup.png"
          alt={t.nav.appName}
          className="h-24 w-auto sm:h-32"
        />

        <div className="w-full rounded-xl bg-white p-6 shadow-xl">
          <h1 className="text-xl font-bold">{t.auth.login.title}</h1>
          <p className="mt-1 text-base text-[color:var(--text-secondary)]">{t.auth.login.subtitle}</p>

          {sessionEndReason === "expired" && (
            <p
              role="alert"
              className="mt-4 rounded-md border border-[color:var(--risk-moderate-border)] bg-[color:var(--risk-moderate-bg)] p-3 text-base text-[color:var(--risk-moderate-text)]"
            >
              {t.auth.session.expiredMessage}
            </p>
          )}

          <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label={t.auth.login.emailLabel}
              type="email"
              icon="mail"
              placeholder={t.auth.login.emailPlaceholder}
              autoComplete="username"
              error={errors.email?.message}
              {...register("email")}
            />
            <TextField
              label={t.auth.login.passwordLabel}
              type="password"
              icon="lock"
              placeholder={t.auth.login.passwordPlaceholder}
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            {errors.root?.message && (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-md border border-[color:var(--risk-critical-border)] bg-[color:var(--risk-critical-bg)] p-3 text-base text-[color:var(--risk-critical-text)]"
              >
                <Icon name="circle-alert" size={16} className="shrink-0" />
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              block
              isLoading={isSubmitting}
              iconRight="arrow-right"
              className="mt-2"
            >
              {isSubmitting ? t.auth.login.submitting : t.auth.login.submit}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-2 border-t border-[color:var(--border-subtle)] pt-4">
            <Icon name="shield-check" size={14} className="shrink-0 text-green-600" />
            <span className="text-xs text-[color:var(--text-secondary)]">{t.auth.login.trustNote}</span>
          </div>
        </div>

        <span className="text-2xs uppercase tracking-[0.04em] text-navy-200">
          {t.auth.login.tagline}
        </span>
      </div>
    </main>
  );
}
