import { localeDefault, locales, type Locale } from "~/shared/i18n"

// https://vike.dev/onPrerenderStart
// We only need this for pre-rendered apps https://vike.dev/pre-rendering
export function onPrerenderStart(prerenderContext: PrerenderContext) {
  const pageContexts: PageContext[] = []
  prerenderContext.pageContexts.forEach((pageContext) => {
    duplicateWithLocale(pageContext, pageContexts)
  })
  return {
    prerenderContext: {
      pageContexts,
    },
  }
}

type PageContext = {
  urlOriginal: string
  [key: string]: unknown
}

type PrerenderContext = {
  pageContexts: PageContext[]
}

function duplicateWithLocale(pageContext: PageContext, pageContexts: PageContext[]) {
  // Duplicate pageContext for each locale
  locales.forEach((locale: Locale) => {
    // Для дефолтной локали URL без префикса, для остальных - с префиксом
    let urlOriginal = pageContext.urlOriginal
    if (locale !== localeDefault) {
      urlOriginal = `/${locale}${pageContext.urlOriginal}`
    }
    pageContexts.push({
      ...pageContext,
      urlOriginal,
      // Set pageContext.locale
      locale,
    })
  })
}
