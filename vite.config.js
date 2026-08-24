import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'

function normalizeLittleBigFeelingsAssets() {
  return {
    name: 'normalize-little-big-feelings-assets',
    enforce: 'pre',
    transform(code, id) {
      const normalizedId = id.replace(/\\/g, '/')
      const isLittleBigFeelings = normalizedId.includes('src/games/Little-Big-Feelings')
      const isFeelingFusion = normalizedId.includes('src/games/Feeling-Fusion')
      if (!isLittleBigFeelings && !isFeelingFusion) {
        return null
      }

      if (!/\.(html|js)$/.test(normalizedId)) return null

      const normalized = code.replace(/(['"`])assets\//g, '$1/assets/')
      return normalized === code ? null : { code: normalized, map: null }
    },
  }
}

const possibleInputs = {
  arcade: resolve(__dirname, 'index.html'),
  stickman: resolve(__dirname, 'src/games/stickman/index.html'),
  wordsOfWisdom: resolve(__dirname, 'src/games/Words-of-Wisdom/index.html'),
  littleBigFeelings: resolve(__dirname, 'src/games/Little-Big-Feelings/index.html'),
  mindscapeDefense: resolve(__dirname, 'src/games/mindscape-defence/index.html'),
  feelingFusion: resolve(__dirname, 'src/games/Feeling-Fusion/index.html'),
  mythVsFact: resolve(__dirname, 'src/games/Myth-vs-Fact/index.html'),
  signalScout: resolve(__dirname, 'src/games/Signal-Scout/index.html'),
}

const buildInputs = Object.fromEntries(
  Object.entries(possibleInputs).filter(([, filePath]) => existsSync(filePath))
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [normalizeLittleBigFeelingsAssets(), react()],
  base: './',
  build: {
    rollupOptions: {
      input: buildInputs,
    },
  },

  server: {
    host: true,
    port: 5173,
  },
})

