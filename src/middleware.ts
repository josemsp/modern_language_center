import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect, cookies } = context;
  const pathname = url.pathname;

  // List of supported locales
  const locales = ["es"];
  const defaultLocale = "es";

  // Get user's preferred language from cookie
  const savedLang = cookies.get("user-lang")?.value;
  const preferredLang =
    savedLang && locales.includes(savedLang) ? savedLang : defaultLocale;

  // 1. Root path redirect: / -> /{preferredLang}/
  if (pathname === "/") {
    return redirect(`/${preferredLang}/`, 302);
  }

  // 2. Redirect paths without locale prefix to the preferred locale
  // Example: /about -> /es/about or /en/about
  const hasLocalePrefix = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocalePrefix && pathname !== "/") {
    // Check if it's a static asset or API route (skip redirect)
    const isAsset = pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i);
    const isApiRoute = pathname.startsWith("/api/");

    if (!isAsset && !isApiRoute) {
      // Redirect to the preferred locale version
      const targetPath = `/${preferredLang}${pathname}`;
      return redirect(targetPath, 302);
    }
  }

  // Continue to the next middleware or page
  return next();
});
