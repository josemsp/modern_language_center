import es from './locales/es.json';
import en from './locales/en.json';

export const languages = {
  es: 'Spanish',
  en: 'English',
};

export const defaultLang = 'es';

export const supportedLocales = Object.entries(languages).map(([lang]) => lang)

export type SupportedLocale = typeof supportedLocales[number];

export type Dictionary = typeof en;

export const dictionaries: Record<SupportedLocale, Dictionary> = { es, en };