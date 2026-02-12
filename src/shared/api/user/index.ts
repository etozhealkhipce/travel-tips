import { createMutation, createQuery } from "@farfetched/core";

import { getProfileFx, loginFx } from "./effects";

export const getProfileQuery =
  createQuery({
    effect: getProfileFx,
    name: "getProfileQueryCheck",
    mapData: ({ result }) => result.data,
  });

export const loginMutation = createMutation({
  effect: loginFx,
  name: "loginMutationCheck",
});