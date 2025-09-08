// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

import react from '@astrojs/react';
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwind()]
  }
});