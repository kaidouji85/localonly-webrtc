import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        sender: resolve(__dirname, 'sender.html'),
        receiver: resolve(__dirname, 'receiver.html'),
      },
    },
  },
})
