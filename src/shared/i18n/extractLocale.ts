import { locales, localeDefault, type Locale } from './locales'

export function extractLocale(urlPathname: string): { locale: Locale; urlPathnameWithoutLocale: string } {
  const path = urlPathname.split('/')
  const first = path[1] // /kz/about → first = 'kz'
  
  // Проверяем только НЕ-дефолтные локали (kz, en)
  const nonDefaultLocales = locales.filter(locale => locale !== localeDefault)
  
  if (nonDefaultLocales.includes(first as any)) {
    // Найдена НЕ-дефолтная локаль в URL → извлекаем её
    return {
      locale: first as Locale,
      urlPathnameWithoutLocale: '/' + path.slice(2).join('/')
    }
  }
  
  // Нет локали в URL → используем дефолтную (ru)
  return {
    locale: localeDefault,
    urlPathnameWithoutLocale: urlPathname
  }
}
