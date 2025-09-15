// src/env.d.ts
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