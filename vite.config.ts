import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react()],
  // Для твоего случая (репозиторий PromTechPK.github.io):
  base: '/PromTechPK.github.io/',  // ✅ Если сайт будет по адресу: esa070708-creator.github.io/PromTechPK.github.io/
})