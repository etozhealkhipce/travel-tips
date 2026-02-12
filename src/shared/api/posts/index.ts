import { createQuery } from "@farfetched/core";
import { getPostsFx } from "./effects";


export const postsQuery = createQuery({
  effect: getPostsFx,
});
