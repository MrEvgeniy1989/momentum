import react from "@vitejs/plugin-react-swc";
import * as path from "node:path";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  base: "/momentum/",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});
