import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Primebd/', // এখানে আপনার GitHub Repo এর নাম দিন
})
