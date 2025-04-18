import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
const isDev = process.env.NODE_ENV !== "production";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      "/api/": {
        target: isDev ? "http://localhost:5000" : "http://api:5000",
        changeOrigin: true,
      },
      "/uploads/": {
        target: isDev ? "http://localhost:5000" : "http://api:5000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
