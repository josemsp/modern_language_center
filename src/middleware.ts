import { defineMiddleware } from "astro:middleware";
import { defaultLang, supportedLocales, type SupportedLocale } from "./i18n/ui";

// export const onRequest = defineMiddleware((context, next) => {
//   // No tocar nada, solo continuar
//   return next();
// });


export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const { pathname } = url;
  
  // Skip static files and assets
  if (pathname.startsWith('/_astro/') || pathname.includes('.') || pathname.startsWith('/api/')) {
    return next();
  }
  
  // Check if already has a supported language in path
  const pathParts = pathname.split('/').filter(Boolean);
  const maybeLang = pathParts[0];
  
  if (supportedLocales.includes(maybeLang as SupportedLocale)) {
    // Already has language, continue normally
    return next();
  }
  
  // Detect user's preferred language
  const preferredLocale = detectUserLocale(request) || defaultLang;
  
  // Redirect to language-specific path
  const newPathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
  
  // Create redirect response with cookie
  return new Response(null, {
    status: 302,
    headers: {
      'Location': newPathname,
      'Set-Cookie': `lang=${preferredLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    }
  });
});

function detectUserLocale(request: Request): SupportedLocale | null {
  const url = new URL(request.url);
  
  // 1. Check URL parameter (for testing)
  const langParam = url.searchParams.get('lang');
  if (langParam && supportedLocales.includes(langParam as SupportedLocale)) {
    return langParam as SupportedLocale;
  }
  
  // 2. Check cookie
  const cookie = request.headers.get('cookie');
  if (cookie) {
    const langCookie = cookie.split(';')
      .find(c => c.trim().startsWith('lang='))
      ?.split('=')[1];
    
    if (langCookie && supportedLocales.includes(langCookie as SupportedLocale)) {
      return langCookie as SupportedLocale;
    }
  }
  
  // 3. Check browser language
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const lang of acceptLanguage.split(',')) {
      const locale = lang.split(';')[0].trim().substring(0, 2) as SupportedLocale;
      if (supportedLocales.includes(locale)) {
        return locale;
      }
    }
  }
  
  return null;
}

//-------------------------
// const supportedLocales = ['es', 'en', 'fr', 'de'];
// const defaultLocale = 'es';

// export const onRequest = defineMiddleware(async (context, next) => {
//   const { url, request } = context;
//   const { pathname, search } = url;
  
//   // Evitar redirecciones para archivos estáticos y API
//   if (pathname.startsWith('/_astro/') || 
//       pathname.startsWith('/api/') ||
//       pathname.includes('.')) {
//     return next();
//   }
  
//   // Verificar si hay un cambio de idioma explícito en la URL
//   const langParam = url.searchParams.get('lang');
//   if (langParam && supportedLocales.includes(langParam)) {
//     const response = await next();
//     const newUrl = new URL(url);
//     newUrl.searchParams.delete('lang');
    
//     // Redirigir y setear cookie del lenguaje elegido
//     return new Response(null, {
//       status: 302,
//       headers: {
//         'Location': newUrl.toString(),
//         'Set-Cookie': `lang=${langParam}; Path=/; Max-Age=31536000; SameSite=Lax`
//       }
//     });
//   }
  
//   // Verificar si la URL ya tiene un idioma
//   const hasLocaleInPath = supportedLocales.some(locale => 
//     pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
//   );
  
//   if (hasLocaleInPath) {
//     return next();
//   }
  
//   // Detectar el idioma preferido del usuario
//   const preferredLocale = detectUserLocale(request) || defaultLocale;
  
//   // Redirigir al idioma detectado (siempre a 'es' si no detecta otro)
//   const newUrl = new URL(url);
//   newUrl.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
  
//   // Crear respuesta de redirección con cookie
//   const response = Response.redirect(newUrl, 302);
//   const responseWithCookie = new Response(response.body, {
//     status: response.status,
//     headers: {
//       ...Object.fromEntries(response.headers),
//       'Set-Cookie': `lang=${preferredLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
//     }
//   });
  
//   return responseWithCookie;
// });

// function detectUserLocale(request: Request): string | null {
//   const url = new URL(request.url);
  
//   // 1. Verificar cookie de idioma existente
//   const cookie = request.headers.get('cookie');
//   if (cookie) {
//     const langCookie = cookie.split(';')
//       .find(c => c.trim().startsWith('lang='))
//       ?.split('=')[1];
    
//     if (langCookie && supportedLocales.includes(langCookie)) {
//       return langCookie;
//     }
//   }
  
//   // 2. Verificar cabecera Accept-Language del navegador
//   const acceptLanguage = request.headers.get('accept-language');
//   if (acceptLanguage) {
//     // Ordenar por preferencia (quality values)
//     const languages = acceptLanguage.split(',')
//       .map(lang => {
//         const parts = lang.split(';');
//         const locale = parts[0].trim();
//         const quality = parts[1] ? parseFloat(parts[1].replace('q=', '')) : 1.0;
//         return { locale: locale.substring(0, 2), quality };
//       })
//       .sort((a, b) => b.quality - a.quality);
    
//     // Encontrar el primer lenguaje soportado
//     for (const lang of languages) {
//       if (supportedLocales.includes(lang.locale)) {
//         return lang.locale;
//       }
//     }
//   }
  
//   // 3. No detectó ningún lenguaje, se usará el default ('es')
//   return null;
// }

//--------

// const SUPPORTED_LANGUAGES = ['es', 'en'];
// const DEFAULT_LANGUAGE = 'es';

// export const onRequest = defineMiddleware((context, next) => {
//   const { url, cookies, redirect } = context;
//   const pathname = url.pathname;
  
//   const segments = pathname.split('/').filter(Boolean);
//   const langFromUrl = segments[0];
//   const savedLanguage = cookies.get('user-lang')?.value;
  
//   // Si la URL no tiene idioma válido
//   if (!segments.length || !SUPPORTED_LANGUAGES.includes(langFromUrl)) {
//     const targetLang = savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage) 
//       ? savedLanguage 
//       : DEFAULT_LANGUAGE;
    
//     return redirect(`/${targetLang}${pathname}`);
//   }
  
//   // Guardar idioma actual en cookie si es válido
//   if (SUPPORTED_LANGUAGES.includes(langFromUrl)) {
//     cookies.set('user-lang', langFromUrl, {
//       httpOnly: false, // Permite acceso desde JavaScript
//       secure: true,
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24 * 365, // 1 año
//       path: '/' // Disponible en toda la app
//     });
    
//     context.locals.currentLang = langFromUrl;
//   }
  
//   return next();
// });