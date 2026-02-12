import { createEffect, createEvent, createStore, sample } from "effector";
import { navigate } from "vike/client/router";
import type { TUser } from "../types/auth/entities";

// Logout event
const logout = createEvent();

const $user = createStore<null | TUser>(null)

const logoutFx = createEffect(() => {
  localStorage.removeItem("user");
  navigate("/login");
})

sample({
  clock: logout,
  fn: () => null,
  target: [logoutFx, $user],
})

const $isAuthorized = $user.map((v) => !!v);

export { $user };

export const $$authModel = {
  $user,
  $isAuthorized,
  logout,
}