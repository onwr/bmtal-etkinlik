import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Tüm IP adreslerinden erişime izin ver
    port: 5173, // Varsayılan port, değiştirilebilir
  },
});
