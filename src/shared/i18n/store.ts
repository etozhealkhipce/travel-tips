import { createStore, createEvent } from 'effector'
import { localeDefault, type Locale } from './locales'
import { extractLocale } from './extractLocale'

// Initialize locale from current URL
const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return localeDefault
  const { locale } = extractLocale(window.location.pathname)
  // extractLocale already returns a valid Locale
  return locale as Locale
}

export const setLocale = createEvent<Locale>()
export const $locale = createStore<Locale>(getInitialLocale())

$locale.on(setLocale, (_, locale) => locale)
