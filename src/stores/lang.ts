import { supportedLocales, type SupportedLocale } from '@/i18n/ui';
import { atom } from 'nanostores';

// current language (default: spanish)
export const $lang = atom<string>('es');

export function setLanguage(lang: SupportedLocale) {
  if (supportedLocales.includes(lang)) {
    $lang.set(lang);
    
    // Set cookie
    document.cookie = `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }
}

// persistence in localStorage
// if (typeof window !== 'undefined') {
//   const saved = localStorage.getItem('lang');
//   if (saved) $lang.set(saved);

//   $lang.subscribe((value) => {
//     localStorage.setItem('lang', value);
//   });
// }
