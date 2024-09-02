import 'react-i18next';

import de from './i18n/de.json';
import en from './i18n/en.json';

export type TranslationKeys =
| "navigation.about-lightnet"
| "navigation.about"
| "navigation.admin"
| "ministry.name"
| "ministry.slogan"
| "home.our-latest-books"
| "home.bbq.title"
| "home.bbq.text"
| "home.bbq.sign-up-now"
| "home.learn-skateboarding";

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      de: typeof de;
    };
  }
  interface TFunction {
    (key: TranslationKeys, options?: any): string;
  }
}

