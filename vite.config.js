import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// If the project lives on an E:/USB drive and Vite crashes with "UNKNOWN: stat", run: VITE_POLL=1 npm run dev
export default defineConfig({
  plugins: [react()],
  server: { port: 5176, watch: process.env.VITE_POLL ? { usePolling: true, interval: 300 } : undefined },
});
