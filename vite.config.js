import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    base: "/",
    plugins: [
        react(),
        laravel([
            "resources/js/panel/index.tsx",
            "resources/css/app.css",
            "resources/js/app.js",
        ]),
        VitePWA({
            mode: "development",
            base: "/",
            manifest: {
                name: "Gastu L3",
                short_name: "Gastu L3",
                theme_color: "green",
                start_url: "/",
                background_color: "green",
                display: "standalone",
                dir: "./public",
                icons: [
                    {
                        src: "/assets/icons/gastu-196.png",
                        sizes: "196x196",
                        type: "image/png",
                    },
                    {
                        purpose: "maskable",
                        sizes: "512x512",
                        src: "/assets/icons/gastu-512.png",
                        type: "image/png",
                    },
                    {
                        src: "/assets/icons/gastu-64.png",
                        sizes: "64x64",
                        type: "image/png",
                    },
                ],
                share_target: {
                    action: "/share",
                    method: "POST",
                    enctype: "multipart/form-data",
                    params: {
                        title: "title",
                        text: "text",
                        url: "url",
                        files: [
                            {
                                name: "attachment",
                                accept: ["image/png", ".png"],
                            },
                        ],
                    },
                },
                // injectRegister: "auto",
            },
        }),
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
