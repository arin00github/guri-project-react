import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        base: env.VITE_BASE_URL,
        server: {
            open: env.VITE_BASE_URL,
            port: 1030,
        },
    };
});
