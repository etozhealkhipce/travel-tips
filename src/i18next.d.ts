import 'i18next';

import type common from './shared/i18n/locales/ru/common.json';
import type auth from './shared/i18n/locales/ru/auth.json';
import type login from './shared/i18n/locales/ru/login.json';
import type errors from './shared/i18n/locales/ru/errors.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      auth: typeof auth;
      login: typeof login;
      errors: typeof errors;
    };
  }
}
