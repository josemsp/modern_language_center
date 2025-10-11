// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { ENV } from './src/config/env';

// https://astro.build/config
export default defineConfig({
  site: ENV.API_URL,
  base: ENV.BASE_PATH,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname, // 👈 Alias real para Vite/Astro
      }
    }
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true
    }
  }
});