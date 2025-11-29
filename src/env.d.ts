/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    currentLang: string;
    user?: {
      id: string;
      name: string;
    };
    theme: 'light' | 'dark';
  }
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.webp" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
