import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                virgil: ["var(--font-virgil)", "sans-serif"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                white: "#2c2c2e",   // Macbook charcoal alternative for cards/hovers
                black: "#f5f5f7",   // Light text
                gray: {
                    50: '#111827',
                    100: '#1f2937',
                    200: '#374151',
                    300: '#4b5563',
                    400: '#6b7280',
                    500: '#9ca3af',
                    600: '#d1d5db',
                    700: '#e5e7eb',
                    800: '#f3f4f6',
                    900: '#f9fafb',
               }
            },
        },
    },
    plugins: [],
};
export default config;
