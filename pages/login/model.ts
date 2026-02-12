import { createEffect, createEvent, sample } from "effector";
import { navigate } from "vike/client/router";
import * as z from "zod";
import { loginMutation } from "~/shared/api/user";
import { loginFx } from "~/shared/api/user/effects";
import { $$authModel } from "~/shared/store/user";

export const loginSchema = z.object({
  email: z.string().email("validation.invalidEmail"),
  password: z.string().min(6, "validation.passwordMinLength"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const formSubmitted = createEvent<LoginSchema>();

const navigateFx = createEffect(() => navigate("/"));

sample({
  clock: formSubmitted,
  target: loginMutation.start,
});

sample({
  clock: loginMutation.finished.success,
  fn: ({ result }) => result.data,
  target: [$$authModel.$user, navigateFx],
})

export const $loginError = loginFx.failData.map((e) => e.message);
