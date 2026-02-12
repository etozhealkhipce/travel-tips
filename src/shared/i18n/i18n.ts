import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { localeDefault } from './locales';

import ruCommon from './locales/ru/common.json';
import ruAuth from './locales/ru/auth.json';
import ruLogin from './locales/ru/login.json';
import ruErrors from './locales/ru/errors.json';

import kzCommon from './locales/kz/common.json';
import kzAuth from './locales/kz/auth.json';
import kzLogin from './locales/kz/login.json';
import kzErrors from './locales/kz/errors.json';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enLogin from './locales/en/login.json';
import enErrors from './locales/en/errors.json';

const resources = {
  ru: { common: ruCommon, auth: ruAuth, login: ruLogin, errors: ruErrors },
  kz: { common: kzCommon, auth: kzAuth, login: kzLogin, errors: kzErrors },
  en: { common: enCommon, auth: enAuth, login: enLogin, errors: enErrors },
};

export function createI18nInstance(locale: string) {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: localeDefault,
    resources,
    defaultNS: 'common',
    interpolation: { escapeValue: false }, // React already escapes
    initImmediate: false, // synchronous initialization (resources already in memory)
  });
  return instance;
}
