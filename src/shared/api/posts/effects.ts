import { attach } from "effector";
import { requestFx } from "../common/base-request";
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPostsFx = attach({
  effect: requestFx,
  mapParams: (_: void) => ({
    url: "/posts",
    method: "get" as const,
  }),
});

