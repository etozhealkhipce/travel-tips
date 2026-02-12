import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/shadcn/ui/button";
import { Input } from "@/shared/ui/shadcn/ui/input";
import { Label } from "@/shared/ui/shadcn/ui/label";
import { loginFx } from "~/shared/api/user/effects";
import { formSubmitted, type LoginSchema, loginSchema } from "./model";

export default function LoginPage() {
  const { t } = useTranslation('login');

  const [isSubmitting, submit] = useUnit([
    loginFx.pending,
    formSubmitted,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {t("title")}
        </h1>
        <p className="text-gray-500 text-center mb-8">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit((data) => submit(data))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              className={errors.email ? "border-red-500" : ""}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-500">{t(errors.email.message as any)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              className={errors.password ? "border-red-500" : ""}
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-sm text-red-500">
                {t(errors.password.message as any)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6"
          >
            {isSubmitting ? t("submitting") : t("submitButton")}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {t("noAccount")}{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            {t("signUp")}
          </a>
        </div>
      </div>
    </div>
  );
}
