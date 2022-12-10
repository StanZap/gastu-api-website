import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    base: "/app/",
    plugins: [
        react(),
        laravel([
            "resources/js/panel/index.tsx",
            "resources/css/app.css",
            "resources/js/app.js",
        ]),
    ],
    server: {
        strictPort: false,
        hmr: {
            // clientPort: 80,
        },
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
});
