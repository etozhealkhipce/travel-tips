import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// https://vike.dev/config
export default {
  // https://vike.dev/clientRouting
  clientRouting: true,

  // https://vike.dev/passToClient
  passToClient: ["scopeValues", "locale"],

  // https://vike.dev/redirects
  redirects: {},

  // https://vike.dev/meta
  meta: {
    pageStarted: {
      env: { client: true, server: true },
    },
    // https://effector.dev/en/api/effector/scope/
    scope: {
      env: { client: true, server: true },
    },
  },

  // https://vike.dev/extends
  extends: [vikeReact],

  // https://vike.dev/hydrationCanBeAborted
  hydrationCanBeAborted: true,
} satisfies Config;
