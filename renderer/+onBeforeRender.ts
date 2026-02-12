import { allSettled, fork, serialize } from "effector";
import type { OnBeforeRenderAsync } from "vike/types";
import { appStarted } from "@/app/init";

import "@/app/init";

// https://vike.dev/onBeforeRender
// onBeforeRender always runs on server-side only
export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  // https://vike.dev/pageContext
  const { pageStarted } = pageContext.config;

  // https://effector.dev/en/api/effector/fork/
  const scope = fork();

  // https://effector.dev/en/api/effector/allsettled/#methods-allSettled-unit-scope-params
  await allSettled(appStarted, { scope });

  if (pageStarted) {
    await allSettled(pageStarted, { scope, params: { params: pageContext.routeParams, data: pageContext.data } });
  }

  return {
    pageContext: {
      scope,
      // https://effector.dev/en/api/effector/serialize
      scopeValues: serialize(scope),
    },
  };
};
