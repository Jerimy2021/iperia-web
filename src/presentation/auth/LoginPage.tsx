import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useTranslation } from "@shared/i18n/useTranslation";
import { TextField } from "@shared/ui/TextField";
import { Button } from "@shared/ui/Button";
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
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-neutral-0 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">{t.auth.login.title}</h1>
        <p className="mt-1 text-sm text-neutral-600">{t.auth.login.subtitle}</p>

        {sessionEndReason === "expired" && (
          <p role="alert" className="mt-4 rounded-md bg-risk-moderado/10 p-3 text-sm text-neutral-800">
            {t.auth.session.expiredMessage}
          </p>
        )}

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label={t.auth.login.emailLabel}
            type="email"
            placeholder={t.auth.login.emailPlaceholder}
            autoComplete="username"
            error={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label={t.auth.login.passwordLabel}
            type="password"
            placeholder={t.auth.login.passwordPlaceholder}
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {errors.root?.message && (
            <p role="alert" className="text-sm text-risk-intolerable">
              {errors.root.message}
            </p>
          )}

          <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
            {isSubmitting ? t.auth.login.submitting : t.auth.login.submit}
          </Button>
        </form>
      </div>
    </main>
  );
}
