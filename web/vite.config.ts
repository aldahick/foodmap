import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import analyze from "rollup-plugin-analyzer";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: process.env.ANALYZE ? [analyze({ summaryOnly: true })] : [],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
  },
});
