/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect } from "effector";
import type { TUser } from "@/shared/types/auth";

export type TAuthResponse = { data: TUser };
export type TAuthPayload = {
  email: string;
  password: string;
};

export const getProfileFx = createEffect(async ({ email }: TAuthPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: {
      id: "1",
      email: email,
      token: `mock-token-${Date.now()}`,
    } as TUser
  };
});

export const loginFx = createEffect(async ({ email }: TAuthPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: {
      id: "1",
      email: email,
      token: `mock-token-${Date.now()}`,
    } as TUser
  };
});
