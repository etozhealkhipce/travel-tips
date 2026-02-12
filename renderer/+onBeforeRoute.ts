import type { PageContext } from "vike/types";
import { extractLocale } from "~/shared/i18n";

export function onBeforeRoute(pageContext: PageContext) {
  const { urlPathnameWithoutLocale, locale } = extractLocale(pageContext.urlParsed.pathname)

  return {
    pageContext: {
      // Make `locale` available as pageContext.locale
      locale,
      // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal
      // urlLogical should be just the pathname without locale prefix
      urlLogical: urlPathnameWithoutLocale,
    },
  }
}