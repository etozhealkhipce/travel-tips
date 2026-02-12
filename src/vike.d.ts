import type { Scope } from "effector";
import type { Locale } from "~/shared/i18n";

declare global {
  namespace Vike {
    interface PageContext {
      scopeValues?: Record<string, unknown>;
      scope?: Scope;
      locale?: Locale;
      config: {
        pageStarted?: any;
      };
    }
  }
}
