import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import { pwaBuildVersion } from './scripts/pwa-build-version.mjs'
import { runtimeCataloguePlugin } from './scripts/runtime-catalogue-plugin.mjs'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === 'build' ? [runtimeCataloguePlugin(), cloudflare(), pwaBuildVersion()] : [])],
}))
