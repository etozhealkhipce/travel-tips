/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFactory, invoke } from "@withease/factories";
import type { RouteInstance } from "atomic-router";
import { createEvent, sample } from "effector";

import { createQueryControls } from "../routing/shared/controls";

export const createPagination = createFactory((route: RouteInstance<any>) => {
  const $currentPage = route.$query.map((query) => Number(query?.page) || 1);

  const goToNextPage = createEvent();
  const goToPrevPage = createEvent();
  const goToPage = createEvent<number>();

  const { update: updateQuery, clear: resetQuery } = invoke(createQueryControls, route);

  sample({
    clock: goToNextPage,
    source: $currentPage,
    fn: (page) => ({ page: String(page + 1) }),
    target: updateQuery,
  });

  sample({
    clock: goToPrevPage,
    source: $currentPage,
    filter: (page) => page > 1,
    fn: (page) => ({ page: String(page - 1) }),
    target: updateQuery,
  });

  sample({
    clock: goToPage,
    fn: (page) => ({ page: String(page) }),
    target: updateQuery,
  });

  return {
    $currentPage,
    goToNextPage,
    goToPrevPage,
    resetQuery,
    goToPage,
  };
});
