import { fork } from "effector";
import { setLocale } from "~/shared/i18n";

// https://vike.dev/onBeforeRenderClient
export async function onBeforeRenderClient(pageContext: Vike.PageContext) {
  // Set the locale in the store for client-side API requests
  if (pageContext.locale) {
    setLocale(pageContext.locale);
  }
  
  // https://vike.dev/pageContext
  if (!("scope" in pageContext)) {
    return {
      pageContext: {
        // https://effector.dev/en/api/effector/fork/
        scope: fork({ values: pageContext.scopeValues }),
      },
    };
  }
}