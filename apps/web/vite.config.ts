/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import relay from 'vite-plugin-relay'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), relay],
  test:{
    globals: true,
    environment:'jsdom',
    setupFiles: './test/setup.ts'
  }
})
