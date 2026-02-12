export const locales = ['ru', 'kz', 'en'] as const
export const localeDefault = 'ru'
export type Locale = typeof locales[number]
