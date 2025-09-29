// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
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