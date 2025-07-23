import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#16a34a", // green-600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f3f4f6", // gray-100
          foreground: "#1f2937", // gray-800
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom tropical colors - Adjusted for darker theme
        tropical: {
          green: {
            50: "#e0f2e9", // Lighter for accents
            100: "#c8e7d6",
            200: "#a0d4bd",
            300: "#78c1a4",
            400: "#50ae8b",
            500: "#289b72",
            600: "#1e7a5b",
            700: "#145a44",
            800: "#0a3a2d",
            900: "#052a20", // Darker green
            950: "#031a14", // Even darker green for backgrounds
          },
          amber: {
            50: "#fff8e1", // Lighter for accents
            100: "#ffedb3",
            200: "#ffe082",
            300: "#ffd351",
            400: "#ffc620",
            500: "#ffb900",
            600: "#cc9400",
            700: "#996f00",
            800: "#664a00",
            900: "#332500", // Darker amber/brown
            950: "#1a1200", // Even darker amber/brown for backgrounds
          },
          sand: {
            // Keeping sand tones for subtle texture/contrast
            50: "#fefcf0",
            100: "#fef7e0",
            200: "#fdecc8",
            300: "#fbdba7",
            400: "#f7c27f",
            500: "#f2a851",
            600: "#eb9234",
            700: "#d97917",
            800: "#b86318",
            900: "#975218",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
      textShadow: {
        lg: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
