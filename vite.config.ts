import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/smart-mess-health-tracker/",
  plugins: [react()],
})

