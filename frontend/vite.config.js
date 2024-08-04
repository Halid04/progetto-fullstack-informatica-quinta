import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/progetto-fullstack-informatica-quinta/",
  plugins: [react()],
});
