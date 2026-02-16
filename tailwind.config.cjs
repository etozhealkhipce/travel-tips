const plugin = require("tailwindcss/plugin");
const { SCREEN_WIDTHS } = require("./src/shared/lib/constants/breakpoints.ts");

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./renderer/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ theme, addBase }) => {
      addBase({
        // or whichever color you'd like
        html: { color: theme("colors.slate.800") },
      });
    }),
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: SCREEN_WIDTHS.xs,
      sm: SCREEN_WIDTHS.sm,
      md: SCREEN_WIDTHS.md,
      lg: SCREEN_WIDTHS.lg,
      xl: SCREEN_WIDTHS.xl,
      "2xl": SCREEN_WIDTHS["2xl"],
    },
    extend: {
      colors: {
        brand: "#FFFF",
      },
      animation: {
        "scale-in": "scale-in 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-in-out",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "slide-down": "slide-down 0.4s ease-in-out",
        "slide-up": "slide-up 0.35s ease-out both",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "heart-pulse": "heart-pulse 0.4s ease-in-out",
        "search-expand": "search-expand 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        "search-collapse": "search-collapse 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "caret-blink": {
          "20%,50%": { opacity: "0" },
          "0%,70%,100%": { opacity: "1" },
        },
        "accordion-up": {
          to: { height: "0" },
          from: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-in-up": {
          from: {
            opacity: 0,
            transform: "translateY(24px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          from: {
            opacity: 0,
            transform: "scale(0.9)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "slide-down": {
          from: {
            opacity: 0,
            transform: "translateY(-20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          from: {
            opacity: 0,
            transform: "translateY(100%)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "heart-pulse": {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.3)" },
          "50%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "search-expand": {
          from: {
            opacity: 0,
            transform: "translateY(-8px) scale(0.98)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
        "search-collapse": {
          from: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
          to: {
            opacity: 0,
            transform: "translateY(-8px) scale(0.98)",
          },
        },
      },
    },
  },
};
