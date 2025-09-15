import { dictionaries, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in dictionaries) return lang as keyof typeof dictionaries;
  return defaultLang;
}

// export function useTranslations(lang: keyof typeof dictionaries) {
//   return function t(key: keyof typeof dictionaries[typeof defaultLang]) {
//     return dictionaries[lang][key] || dictionaries[defaultLang][key];
//   }
// }

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? T[K] extends any[]
          ? K
          : `${K}.${NestedKeys<T[K]>}`
        : K;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeys<typeof dictionaries.es>;

export function useTranslations(lang: keyof typeof dictionaries) {
  return function t(key: NestedKeys<typeof dictionaries[typeof defaultLang]>) {
    const keys = key.split('.');
    let value: any = dictionaries[lang] || dictionaries[defaultLang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || dictionaries[defaultLang][key as keyof typeof dictionaries[typeof defaultLang]] || key;
  }
}